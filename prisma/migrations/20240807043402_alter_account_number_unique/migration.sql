/*
  Warnings:

  - A unique constraint covering the columns `[account_number]` on the table `PaymentAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PaymentAccount_user_id_account_number_idx";

-- CreateIndex
CREATE UNIQUE INDEX "PaymentAccount_account_number_key" ON "PaymentAccount"("account_number");

-- CreateIndex
CREATE INDEX "PaymentAccount_user_id_idx" ON "PaymentAccount"("user_id");
