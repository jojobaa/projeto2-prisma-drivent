import { Router } from "express";
import { authenticateToken} from "@/middlewares";
import { ticketsTypes, tickets, ticketsCreate } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", ticketsTypes)
  .get("", tickets)
  .post("", ticketsCreate)

export { ticketsRouter };

