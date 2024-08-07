import { TRANSACTION_TYPE } from "@prisma/client";

export interface TransactionRequest {
  sender_account_number: string;
  receiver_account_number: string | null;
  amount: number;
  currency: string;
  type: TRANSACTION_TYPE;
}