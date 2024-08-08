import { TRANSACTION_TYPE } from "@prisma/client";
import prisma from "../config/prisma";
import { PaymentHistoryRequest } from "../types/requests";
import { findAccountByNumber, getAccountsByUserId } from "./paymentAccountService";


export const createPaymentHistoryRecord = async (
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

export const getPaymentHistoriesByUserId = async (user_id: string, payment_history: PaymentHistoryRequest) => {
  let accountIds: number[] = [];
  if (payment_history.account_number) {
    const paymentAccount = await findAccountByNumber(payment_history.account_number);
    if (!paymentAccount) {
      throw new Error("Payment account not found");
    }
    accountIds.push(paymentAccount.id);
  } else {
    const paymentAccounts = await getAccountsByUserId(user_id);
    accountIds = paymentAccounts.map(account => account.id);
  }
  const whereClause: any = {
    account_id: { in: accountIds }
  };

  return await prisma.paymentHistory.findMany({
    relationLoadStrategy: 'query',
    include: {
      account: {
        select: {
          account_number: true
        }
      },
    },
    where: whereClause,
  });
};