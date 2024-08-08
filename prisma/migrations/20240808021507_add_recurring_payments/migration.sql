-- CreateEnum
CREATE TYPE "RECURRING_PAYMENT_STATUS" AS ENUM ('ENABLED', 'DISABLED');

-- AlterTable
ALTER TABLE "PaymentHistory" ADD COLUMN     "recurring_id" INTEGER;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "recurring_id" INTEGER;

-- CreateTable
CREATE TABLE "RecurringPayment" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL,
    "recurring_date" TIMESTAMP(3) NOT NULL,
    "receiver_account_id" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'IDR',
    "status" "RECURRING_PAYMENT_STATUS" NOT NULL DEFAULT 'ENABLED',
    "last_executed_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecurringPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RecurringPayment_user_id_account_id_status_idx" ON "RecurringPayment"("user_id", "account_id", "status");

-- AddForeignKey
ALTER TABLE "RecurringPayment" ADD CONSTRAINT "RecurringPayment_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "PaymentAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringPayment" ADD CONSTRAINT "RecurringPayment_receiver_account_id_fkey" FOREIGN KEY ("receiver_account_id") REFERENCES "PaymentAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
