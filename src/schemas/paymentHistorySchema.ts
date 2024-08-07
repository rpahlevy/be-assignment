export const paymentHistoryRequestSchema = {
  type: "object",
  properties: {
    account_number: {
      type: "string",
    },
  },
};

export const paymentHistoryResponseSchema = {
  type: "array",
  description: "List of Payment History",
  items: {
    type: "object",
    properties: {
      id: { type: "number" },
      account_id: { type: "number" },
      transaction_id: { type: "string" },
      amount: { type: "number" },
      currency: { type: "string" },
      transaction_type: {
        type: "string",
        enum: ["SEND", "RECEIVE", "WITHDRAW"],
      },
      created_at: { type: "string", format: "date-time" },
    },
  },
};
