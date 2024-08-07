export const authRequestSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
  },
};

export const authResponseSchema = {
  type: "object",
  description: "Succesful register",
  properties: {
    user: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string" },
      },
    },
    access_token: { type: "string" },
    token_type: { type: "string" },
    expires_in: { type: "integer" },
    expires_at: { type: "integer" },
    refresh_token: { type: "string" },
  },
};
