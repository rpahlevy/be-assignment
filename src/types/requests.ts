import { TRANSACTION_TYPE } from "@prisma/client";

export interface AuthRequest {
  email: string;
  password: string;
}

export interface WithdrawRequest {
  account_number: string;
  amount: number;
  currency: string;
}

export interface SendRequest {
  sender_account_number: string;
  receiver_account_number: string;
  amount: number;
  currency: string;
}