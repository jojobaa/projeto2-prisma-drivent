import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { Ticket, TicketStatus } from "@prisma/client";

async function getTicketTypes() {

    const tickets = await ticketsRepository.findTickets();
    if (!tickets) {
        throw notFoundError();
    }

    return tickets;
}

async function ticketsUserId(userId: number) {
    const enrollmentId = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollmentId) {
        throw notFoundError();
    }

    const ticketEnrollment = await ticketsRepository.findTicketsEnrollment(enrollmentId.id);
    if (!ticketEnrollment) {
        throw notFoundError();
    }

    return ticketEnrollment;
}

async function ticketsCreate(userId: number, ticketTypeId: number) {
    const enrollmentId = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollmentId) {
        throw notFoundError();
    }

    const ticketData = {
        ticketTypeId,
        enrollmentId: enrollmentId.id,
        status: TicketStatus.RESERVED
    }

    await ticketsRepository.createTicket(ticketData);

    const ticketEnrollment = await ticketsRepository.findTicketsEnrollment(enrollmentId.id);

    return ticketEnrollment;
}

export type CreateTypeParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">

const ticketsTypeService = {
    getTicketTypes, ticketsUserId, ticketsCreate
};

export default ticketsTypeService;