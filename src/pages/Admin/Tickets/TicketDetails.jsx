/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { dateFormat } from "../../../utils/Dates";
import ReactQuill from "react-quill";
import { cn } from "../../../lib/Utils";
import useTicket from "../../../hooks/useTicket";
import AssingTicket from "./components/AsignTicket";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const { ticket, getTicketById } = useTicket();

  useEffect(() => {
    (async () => {
      await getTicketById(ticketId);
    })();
  }, [ticketId]);

  if (!ticketId) {
    return <Navigate to="/tickets" />;
  }

  return (
    <div className="container mx-auto max-w-[80vw]">
      <div className="mb-10">
        <h1 className="text-2xl font-medium">Detalles del ticket</h1>
      </div>
      <div>
        <div className="flex items-start gap-4">
          <i
            className={cn(
              "fi fi-rr-ticket text-3xl",
              ticket.status === "pending"
                ? "text-amber-500"
                : ticket.status === "inProcess"
                ? "text-sky-500"
                : "text-green-500"
            )}
          ></i>
          <div>
            <h3 className="text-xl font-medium">{ticket.title}</h3>
            <ul className="text-sm text-gray-500 flex flex-col md:flex-row md:items-center gap-x-4">
              <li>Categoría: {ticket.category}</li>
              <li>Creador: {ticket.createdBy?.name}</li>
              <li>
                Creado en:
                {!ticket.createdAt ? "" : dateFormat(ticket.createdAt)}
              </li>
              {ticket.assignedTo && (
                <li>Asignado a: {ticket.assignedTo.name}</li>
              )}
            </ul>
          </div>
        </div>
        {ticket.status === "pending" && !ticket.assignedTo ? (
          <AssingTicket />
        ) : null}
        <hr className="my-5" />
        <div>
          <ReactQuill
            theme="snow"
            modules={{
              toolbar: false,
            }}
            className="mt-5"
            value={ticket.description}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
