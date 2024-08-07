import { PaymentAccount, TRANSACTION_STATUS, TRANSACTION_TYPE } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import prisma from '../config/prisma';

export const handleTransaction = async (
  user_id: string,
  sender_account_number: string,
  receiver_account_number: string | null,
  amount: number,
  currency: string,
  type: TRANSACTION_TYPE
) => {
  if (!sender_account_number || amount <= 0) {
    throw new Error('Invalid account number or amount');
  }

  if (!currency) {
    throw new Error('Enter currency');
  }

  const senderAccount = await prisma.paymentAccount.findFirst({
    where: {
      account_number: sender_account_number,
      user_id
    }
  });

  if (!senderAccount) {
    throw new Error('Sender account not found');
  }

  if (senderAccount.balance < new Decimal(amount)) {
    throw new Error('Insufficient balance');
  }

  let receiverAccount: PaymentAccount | null = senderAccount;;
  if (type === TRANSACTION_TYPE.SEND) {
    if (!receiver_account_number) {
      throw new Error('Receiver account number is required for SEND transaction');
    }

    receiverAccount = await prisma.paymentAccount.findFirst({
      where: { account_number: receiver_account_number }
    });

    if (!receiverAccount) {
      throw new Error('Receiver account not found');
    }
  }

  const transaction = await prisma.transaction.create({
    data: {
      sender_account_id: senderAccount.id,
      receiver_account_id: receiverAccount.id,
      amount,
      currency,
      status: TRANSACTION_STATUS.PENDING
    }
  });

  await prisma.paymentHistory.create({
    data: {
      account_id: senderAccount.id,
      transaction_id: transaction.id,
      amount,
      transaction_type: type
    }
  });

  if (type === TRANSACTION_TYPE.SEND) {
    await prisma.paymentHistory.create({
      data: {
        account_id: receiverAccount.id,
        transaction_id: transaction.id,
        amount,
        transaction_type: TRANSACTION_TYPE.RECEIVE
      }
    });

    await prisma.paymentAccount.update({
      where: { id: receiverAccount.id },
      data: { balance: { increment: amount } }
    });
  }

  await prisma.paymentAccount.update({
    where: { id: senderAccount.id },
    data: { balance: { decrement: amount } }
  });

  return transaction;
};
