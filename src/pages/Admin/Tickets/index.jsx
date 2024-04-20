import { useEffect, useState } from "react";
import api from "../../../lib/Axios";
import { CardTicket } from "../../../components/widgets/CardTicket";
import { Link } from "react-router-dom";

const HomeTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token-MERN");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await api.get("/tickets", config);
        setTickets(data);
      } catch (error) {
        setTickets([]);
      }
    })();
  }, []);

  return (
    <div>
      <div className="container mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-medium">Tickets</h1>
          <Link
            to="/tickets/create"
            className="bg-gray-100 py-2 px-4 rounded-md"
          >
            Crear ticket
          </Link>
        </div>
        <div>
          {tickets.length > 0 ? (
            <ul>
              {tickets.map((ticket) => (
                <li key={ticket._id}>
                  <CardTicket data={ticket} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay tickets</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeTickets;
