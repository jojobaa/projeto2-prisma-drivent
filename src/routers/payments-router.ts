import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentByTicket, paymentCreate } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicket)
  .post("/process", paymentCreate);

export { paymentsRouter };

