import { RecurringPayment } from "@prisma/client";
import * as schedule from "node-schedule";
import { processRecurringPayment } from "../services/recurringPaymentService";

export const scheduleRecurringPayment = (payment: RecurringPayment) => {
  schedule.scheduleJob(payment.recurring_date, () => {
    console.log("scheduling job for: "+ payment.id);
    processRecurringPayment(payment);
  });
}