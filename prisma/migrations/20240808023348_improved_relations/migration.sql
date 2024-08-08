-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sender_account_id_fkey" FOREIGN KEY ("sender_account_id") REFERENCES "PaymentAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiver_account_id_fkey" FOREIGN KEY ("receiver_account_id") REFERENCES "PaymentAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
