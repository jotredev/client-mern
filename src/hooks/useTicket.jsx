import { useContext } from "react";
import TicketContext from "../providers/TicketProvider";

const useTicket = () => {
  return useContext(TicketContext);
};

export default useTicket;
