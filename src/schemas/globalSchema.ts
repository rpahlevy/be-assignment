export const errorResponseSchema = {
  type: "object",
  description: "Return error message",
  properties: {
    error: { type: 'string', description: 'The error message' },
  },
  example: {
    error: 'Invalid email or password',
  },
};
