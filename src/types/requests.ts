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

export interface PaymentHistoryRequest {
  account_number: string;
}

export interface SendRequest {
  account_number: string;
  receiver_account_number: string;
  amount: number;
  currency: string;
  recurring_id: number | null;
}

export interface RecurringPaymentRequest {
  account_number: string;
  receiver_account_number: string;
  recurring_date: string;
  amount: number;
  currency: string;
}
