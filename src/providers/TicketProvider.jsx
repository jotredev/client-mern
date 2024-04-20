/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import api from "../lib/Axios";

const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [ticket, setTicket] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token-MERN");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // Crear ticket
  const createTicket = async (dataTicket) => {
    try {
      const { data } = await api.post("/tickets", dataTicket, config);

      if (data.response === "success") {
        toast.success(data.message);
        navigate("/tickets");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener ticket por ID
  const getTicketById = async (ticketId) => {
    try {
      const { data } = await api.get(`/tickets/${ticketId}`, config);

      if (data) {
        setTicket(data);
      }
    } catch (error) {
      console.log(error);
      setTicket({});
    }
  };

  const assignUserSupport = async () => {
    try {
      const { data } = await api.put(
        `/tickets/assign/${ticket._id}`,
        {},
        config
      );

      if (data.response === "success") {
        toast.success(data.message);
        setTicket({ ...ticket, assignedTo: data.ticket.assignedTo });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setTicket({ ...ticket });
    }
  };

  const ticketInProcess = async (dueDate) => {
    try {
      const { data } = await api.put(
        `/tickets/in-process/${ticket._id}`,
        dueDate,
        config
      );

      if (data.response === "success") {
        toast.success(data.message);
        setTicket(data.ticket);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setTicket({});
    }
  };

  const closeTicket = async () => {
    try {
      const { data } = await api.put(
        `/tickets/close-ticket/${ticket._id}`,
        {},
        config
      );

      if (data.response === "success") {
        toast.success(data.message);
        setTicket(data.ticket);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setTicket({ ...ticket });
    }
  };

  return (
    <TicketContext.Provider
      value={{
        ticket,
        setTicket,
        createTicket,
        getTicketById,
        assignUserSupport,
        ticketInProcess,
        closeTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export { TicketProvider };

export default TicketContext;
