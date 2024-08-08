export const recurringPaymentRequestSchema = {
  type: "object",
  required: ["account_number", "recurring_date", "receiver_account_number", "amount", "currency"],
  properties: {
    account_number: { type: "string" },
    recurring_date: { type: "string", format: "date-time" },
    receiver_account_number: { type: "string" },
    amount: { type: "number" },
    currency: { type: "string" },
  },
};

export const recurringPaymentResponseSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    user_id: { type: "string" },
    account_number: { type: "string" },
    recurring_date: { type: "string", format: "date-time" },
    receiving_account_number: { type: "string" },
    amount: { type: "number" },
    currency: { type: "string" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
  },
};

export const getrecurringPaymentsResponseSchema = {
  type: "array",
  description: "List of Recurring Payment",
  items: recurringPaymentResponseSchema,
};
