import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketTypes() {

 const tickets = await ticketsRepository.findTickets();
 if(!tickets){
    throw notFoundError();
 }

 return tickets;
}

const ticketsTypeService = {
  getTicketTypes
};

export default ticketsTypeService;