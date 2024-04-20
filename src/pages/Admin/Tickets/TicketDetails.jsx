/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { dateFormat } from "../../../utils/Dates";
import ReactQuill from "react-quill";
import { cn } from "../../../lib/Utils";
import useTicket from "../../../hooks/useTicket";
import useAuth from "../../../hooks/useAuth";
import AssingTicket from "./components/AsignTicket";
import DueDate from "./components/DueDate";
import CloseTicket from "./components/CloseTicket";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const { auth } = useAuth();
  const { ticket, getTicketById } = useTicket();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await getTicketById(ticketId);
      setIsLoading(false);
    })();
  }, [ticketId]);

  if (isLoading) return <p>Cargando....</p>;

  if (!ticketId) {
    return <Navigate to="/tickets" />;
  }

  if (
    ticket.createdBy._id.toString() !== auth._id &&
    !auth.permissions.includes("support")
  ) {
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
            <h3 className="text-xl font-medium flex items-center">
              {ticket.title}
              <span
                className={cn(
                  "py-0.5 px-2 rounded-md ml-2 text-xs",
                  ticket.status === "pending"
                    ? "text-amber-500 bg-amber-500/10"
                    : ticket.status === "inProcess"
                    ? "text-sky-500 bg-sky-500/10"
                    : "text-green-500 bg-green-500/10"
                )}
              >
                {ticket.status === "pending"
                  ? "Pendiente"
                  : ticket.status === "inProcess"
                  ? "En proceso"
                  : "Cerrado"}
              </span>
            </h3>
            <ul className="text-sm text-gray-500 flex flex-col md:flex-row md:items-center gap-x-4 mb-2">
              <li>Categoría: {ticket.category}</li>
              <li>Creador: {ticket.createdBy?.name}</li>
              <li>
                Creado en:{" "}
                {!ticket.createdAt ? "" : dateFormat(ticket.createdAt)}
              </li>
            </ul>
            <ul className="text-sm text-gray-500 flex flex-col md:flex-row md:items-center gap-x-4">
              {ticket.assignedTo && (
                <li>Asignado a: {ticket.assignedTo.name}</li>
              )}
              {ticket.dueDate && (
                <li>Fecha compromiso: {dateFormat(ticket.dueDate)}</li>
              )}
            </ul>
          </div>
        </div>
        {ticket.status === "pending" &&
        !ticket.assignedTo &&
        auth.permissions.includes("support") ? (
          <AssingTicket />
        ) : null}
        {ticket.status === "pending" &&
        ticket.assignedTo &&
        auth.permissions.includes("support") ? (
          <DueDate />
        ) : null}
        {ticket.status === "inProcess" &&
        !auth.permissions.includes("support") ? (
          <CloseTicket />
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
