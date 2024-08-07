export const paymentAccountRequestSchema = {
  type: "object",
  required: ["account_number", "account_type", "balance", "currency"],
  properties: {
    account_number: { type: "string" },
    account_type: { type: "string", enum: ["DEBIT", "CREDIT", "LOAN"] },
    balance: { type: "number" },
    currency: { type: "string" },
  },
};

export const paymentAccountResponseSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    user_id: { type: "string" },
    account_number: { type: "string" },
    account_type: { type: "string" },
    balance: { type: "number" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
  },
};

export const getPaymentAccountsResponseSchema = {
  type: "array",
  description: "List of Payment Account",
  items: paymentAccountResponseSchema,
};
