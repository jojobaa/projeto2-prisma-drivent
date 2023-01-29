import { prisma } from "@/config";
import { Ticket, TicketStatus } from "@prisma/client";

async function findTickets() {
    return prisma.ticketType.findMany();
}

async function findTicketsEnrollment(enrollmentId: number) {
    return prisma.ticket.findFirst({
        where: {
            enrollmentId
        },
        include: {
            TicketType: true
        }
    });
}

async function createTicket(ticket:CreateTypeParams) {
    return prisma.ticket.create({
        data:{
            ...ticket
        }
    });
}

export type CreateTypeParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">

const ticketsRepository = {
    findTickets, findTicketsEnrollment, createTicket
};

export default ticketsRepository;