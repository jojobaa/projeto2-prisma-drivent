import { prisma } from "@/config";

async function findTickets() {
    return prisma.ticketType.findMany();
}

const ticketsRepository = {
    findTickets
};

export default ticketsRepository;