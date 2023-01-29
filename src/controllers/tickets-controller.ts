import { AuthenticatedRequest } from "@/middlewares";
import ticketsTypeService from "@/services/tickets-services";
import { Response } from "express";
import httpStatus from "http-status";

export async function ticketsTypes(req: AuthenticatedRequest, res: Response) {

  try {
    const ticketTypes = await ticketsTypeService.getTicketTypes();

    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function tickets(req: AuthenticatedRequest, res: Response) {

  const { userId } = req;

  try {
    const ticketTypes = await ticketsTypeService.ticketsUserId(userId);

    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function ticketsCreate(req: AuthenticatedRequest, res: Response) {

  const { userId } = req;
  const { ticketTypeId } = req.body;

  if(!ticketTypeId){
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }

  try {
    const ticketTypes = await ticketsTypeService.ticketsCreate(userId, ticketTypeId);

    return res.status(httpStatus.CREATED).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}


