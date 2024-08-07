import {
  PaymentAccount,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
} from "@prisma/client";
import prisma from "../config/prisma";
import { SendRequest } from "../types/requests";
import { findAccountByNumber } from "./paymentAccountService";

const createTransactionRecord = async (
  sender_account_id: number,
  receiver_account_id: number,
  amount: number,
  currency: string
) => {
  return await prisma.transaction.create({
    data: {
      sender_account_id,
      receiver_account_id,
      amount,
      currency,
      status: "PENDING",
    },
  });
};

const updateTransactionRecord = async (transaction_id: string, status: TRANSACTION_STATUS) => {
  const updateData: any = {};
  updateData.status = status;

  return await prisma.transaction.update({
    where: { id: transaction_id },
    data: updateData,
  });
};

const createPaymentHistoryRecord = async (
  account_id: number,
  transaction_id: string,
  amount: number,
  transaction_type: TRANSACTION_TYPE
) => {
  return await prisma.paymentHistory.create({
    data: {
      account_id,
      transaction_id,
      amount,
      transaction_type,
    },
  });
};

const updateAccountBalance = async (
  account_id: number,
  amount: number,
  operation: "increment" | "decrement"
) => {
  const updateData: any = {};
  updateData.balance = { [operation]: amount };

  return await prisma.paymentAccount.update({
    where: { id: account_id },
    data: updateData,
  });
};

const processTransaction = async (transaction_id: string) => {
  return new Promise((resolve, reject) => {
    console.log("Processing transaction: ", transaction_id);
    setTimeout(() => {
      console.log("Transaction procesing completed for: ", transaction_id);
      resolve(transaction_id);
    }, 30000);
  });
};

export const handleTransaction = async (
  user_id: string,
  type: TRANSACTION_TYPE,
  transaction: SendRequest
) => {
  if (!transaction.account_number || transaction.amount <= 0) {
    throw new Error("Invalid account number or amount");
  }

  if (!transaction.currency) {
    throw new Error("Enter currency");
  }

  const senderAccount = await findAccountByNumber(transaction.account_number, user_id);
  if (!senderAccount) {
    throw new Error("Sender account not found");
  }

  if (senderAccount.balance.lessThan(transaction.amount)) {
    throw new Error("Insufficient balance");
  }

  let receiverAccount: PaymentAccount | null = senderAccount;
  if (type === TRANSACTION_TYPE.SEND) {
    if (!transaction.receiver_account_number) {
      throw new Error(
        "Receiver account number is required for SEND transaction"
      );
    }

    receiverAccount = await findAccountByNumber(transaction.receiver_account_number);
    if (!receiverAccount) {
      throw new Error("Receiver account not found");
    }
  }

  let newTransaction = await createTransactionRecord(
    senderAccount.id,
    receiverAccount.id,
    transaction.amount,
    transaction.currency
  );

  // simulate transaction processing
  await processTransaction(newTransaction.id);

  return await prisma.$transaction(async (prisma) => {
    // change status to SUCCESS
    newTransaction = await updateTransactionRecord(
      newTransaction.id,
      TRANSACTION_STATUS.SUCCESS
    );

    // add history for sender
    await createPaymentHistoryRecord(
      senderAccount.id,
      newTransaction.id,
      transaction.amount,
      type
    );

    // add history and update balance for receiver
    if (type === "SEND") {
      await createPaymentHistoryRecord(
        receiverAccount!.id,
        newTransaction.id,
        transaction.amount,
        TRANSACTION_TYPE.RECEIVE
      );
      await updateAccountBalance(
        receiverAccount!.id,
        transaction.amount,
        "increment"
      );
    }

    // finally update balance for sender
    await updateAccountBalance(
      senderAccount.id,
      transaction.amount,
      "decrement"
    );

    return newTransaction;
  });
};
