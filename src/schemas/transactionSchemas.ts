export const sendRequestSchema = {
  type: "object",
  required: ["account_number", "amount", "currency"],
  properties: {
    account_number: { type: "string" },
    receiver_account_number: { type: "string" },
    amount: { type: "number" },
    currency: { type: "string" },
  },
};

export const withdrawRequestSchema = {
  type: "object",
  required: ["account_number", "amount", "currency"],
  properties: {
    account_number: { type: "string" },
    amount: { type: "number" },
    currency: { type: "string" },
  },
};

export const transactionResponseSchema = {
  type: "object",
  description: "Details of the Transaction",
  properties: {
    id: { type: "string" },
    amount: { type: "number" },
    currency: { type: "string" },
    status: {
      type: "string",
      enum: ["PENDING", "SUCCESS", "FAILED"],
    },
    created_at: {
      type: "string",
      format: "date-time",
    },
    account: {
      type: "object",
      properties: {
        account_number: { type: "string" }
      }
    },
    receiver_account: {
      type: "object",
      properties: {
        account_number: { type: "string" }
      }
    }
  },
};

export const transactionsResponseSchema = {
  type: "array",
  description: "List of Transactions",
  items: transactionResponseSchema,
};
