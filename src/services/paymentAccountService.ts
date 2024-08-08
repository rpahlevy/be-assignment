import { ACCOUNT_TYPE } from "@prisma/client";
import prisma from "../config/prisma";
import { PaymentAccountRequest } from "../types/requests";

export const getAccountById = async (
  account_id: number,
  user_id?: string
) => {
  const whereClause: any = { id: account_id };
  if (user_id) {
    whereClause.user_id = user_id;
  }

  return await prisma.paymentAccount.findFirst({
    where: whereClause,
  });
};

export const findAccountByNumber = async (
  account_number: string,
  user_id?: string
) => {
  const whereClause: any = { account_number };
  if (user_id) {
    whereClause.user_id = user_id;
  }

  return await prisma.paymentAccount.findFirst({
    where: whereClause,
  });
};

export const getAccountsByUserId = async (user_id: string) => {
  const whereClause: any = { user_id };

  return await prisma.paymentAccount.findMany({
    where: whereClause,
  });
};

const createPaymentAccountRecord = async (
  user_id: string,
  account_number: string,
  account_type: ACCOUNT_TYPE,
  balance: number,
  currency: string
) => {
  return await prisma.paymentAccount.create({
    data: {
      user_id,
      account_number,
      account_type,
      balance,
      currency,
    },
  });
};

export const handleCreatePaymentAccount = async (user_id: string, paymentAccount: PaymentAccountRequest) => {
  if (!paymentAccount.account_number) {
    throw new Error("Missing/invalid account number");
  }
  if (!paymentAccount.currency) {
    throw new Error("Missing/invalid currency");
  }
  if (!Object.values(ACCOUNT_TYPE).includes(paymentAccount.account_type)) {
    throw new Error("Invalid account type. Only accept: " + Object.values(ACCOUNT_TYPE).join(", "));
  }
  if (typeof paymentAccount.balance !== "number" || paymentAccount.balance < 0) {
    throw new Error("Invalid balance");
  }

  try {
    return await createPaymentAccountRecord(
      user_id,
      paymentAccount.account_number,
      paymentAccount.account_type,
      paymentAccount.balance,
      paymentAccount.currency
    );
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target.includes("account_number")) {
      throw new Error("Account number already exists");
    } else {
      throw error;
    }
  }
};
