import { AuthenticatedRequest } from "@/middlewares";
import paymentService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentByTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketId = Number(req.query.ticketId);
    const { userId } = req;

    if (!ticketId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const payment = await paymentService.getPaymentByTicket(userId, ticketId);

    if (!payment) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function paymentCreate(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const {
      ticketId,
      cardData,
    } = req.body;

    if (!ticketId || !cardData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const payment = await paymentService.paymentCreate(ticketId, userId, cardData);

    if (!payment) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}




