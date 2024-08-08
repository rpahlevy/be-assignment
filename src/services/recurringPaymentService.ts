import { RecurringPayment, RECURRING_PAYMENT_STATUS, TRANSACTION_STATUS, TRANSACTION_TYPE } from "@prisma/client";
import prisma from "../config/prisma";
import { RecurringPaymentRequest, SendRequest } from "../types/requests";
import { scheduleRecurringPayment } from "../utils/scheduler";
import { findAccountByNumber, getAccountById, getAccountsByUserId } from "./paymentAccountService";
import { handleTransaction } from "./transactionService";

const createRecurringPaymentRecord = async (
  user_id: string,
  account_id: number,
  recurring_date: string,
  receiver_account_id: number,
  amount: number,
  currency: string
) => {
  return await prisma.recurringPayment.create({
    data: {
      user_id,
      account_id,
      recurring_date,
      receiver_account_id,
      amount,
      currency,
    },
  });
};

const updateRecurringPaymentRecord = async (id: number, status: RECURRING_PAYMENT_STATUS) => {
  const updateData: any = {};
  updateData.status = status;
  updateData.last_executed_date = new Date();

  return await prisma.recurringPayment.update({
    where: { id },
    data: updateData,
  });
};

const getRecurringPaymentById = async (
  id: number
) => {
  const whereClause: any = { id };

  return await prisma.recurringPayment.findFirst({
    include: {
      account: {
        select: {
          account_number: true
        }
      },
      receiver_account: {
        select: {
          account_number: true
        }
      },
    },
    where: whereClause,
  });
};

export const getRecurringPaymentsByUserId = async (user_id: string) => {
  const paymentAccounts = await getAccountsByUserId(user_id);
  const accountIds = paymentAccounts.map(account => account.id);
  const whereClause: any = {
    OR: [
      { account_id: { in: accountIds } },
      { receiver_account_id: { in: accountIds } }
    ]
  };

  return await prisma.recurringPayment.findMany({
    include: {
      account: {
        select: {
          account_number: true
        }
      },
      receiver_account: {
        select: {
          account_number: true
        }
      },
    },
    where: whereClause,
  });
};

export const processRecurringPayment = async (payment: RecurringPayment) => {
  console.log("process recurring payment");
  const senderAccount = await getAccountById(payment.account_id);
  if (!senderAccount) {
    throw new Error("Sender account not found");
  }
  const receiverAccount = await getAccountById(payment.receiver_account_id);
  if (!receiverAccount) {
    throw new Error("Receiver account not found");
  }

  const sendRequest: SendRequest = {
    account_number: senderAccount.account_number,
    receiver_account_number: receiverAccount.account_number,
    amount: payment.amount.toNumber(),
    currency: payment.currency,
    recurring_id: payment.id
  }
  await handleTransaction(
    payment.user_id,
    TRANSACTION_TYPE.SEND,
    sendRequest
  );

  await updateRecurringPaymentRecord(payment.id, RECURRING_PAYMENT_STATUS.DISABLED);
}

export const handleCreateRecurringPayment = async (user_id: string, recurringPayment: RecurringPaymentRequest) => {
  if (!recurringPayment.account_number) {
    throw new Error("Missing/invalid account number");
  }
  if (!recurringPayment.currency) {
    throw new Error("Missing/invalid currency");
  }
  if (typeof recurringPayment.amount !== "number" || recurringPayment.amount < 0) {
    throw new Error("Invalid amount");
  }

  const senderAccount = await findAccountByNumber(recurringPayment.account_number, user_id);
  if (!senderAccount) {
    throw new Error("Sender account not found");
  }
  // balance checking should be done on recurring cron
  // if (senderAccount.balance.lessThan(recurringPayment.amount)) {
  //   throw new Error("Insufficient balance");
  // }

  if (!recurringPayment.receiver_account_number) {
    throw new Error(
      "Receiver account number is required for SEND transaction"
    );
  }
  const receiverAccount = await findAccountByNumber(recurringPayment.receiver_account_number);
  if (!receiverAccount) {
    throw new Error("Receiver account not found");
  }

  let newRecurringPayment = await createRecurringPaymentRecord(
    user_id,
    senderAccount.id,
    recurringPayment.recurring_date,
    receiverAccount.id,
    recurringPayment.amount,
    recurringPayment.currency
  );

  scheduleRecurringPayment(newRecurringPayment);

  return await getRecurringPaymentById(newRecurringPayment.id);
};
