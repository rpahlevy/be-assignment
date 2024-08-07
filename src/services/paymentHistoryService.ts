import { TRANSACTION_TYPE } from "@prisma/client";
import prisma from "../config/prisma";


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