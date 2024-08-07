import { ACCOUNT_TYPE } from "@prisma/client";

export interface AuthRequest {
  email: string;
  password: string;
}

export interface PaymentAccountRequest {
  account_number: string;
  account_type: ACCOUNT_TYPE;
  balance: number;
  currency: string;
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