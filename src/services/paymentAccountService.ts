import prisma from "../config/prisma";

export const findAccountByNumber = async (account_number: string, user_id?: string) => {
  const whereClause: any = { account_number };
  if (user_id) {
    whereClause.user_id = user_id;
  }
  
  return await prisma.paymentAccount.findFirst({
    where: whereClause
  });
};
