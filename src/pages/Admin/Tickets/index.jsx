import { useEffect, useState } from "react";
import api from "../../../lib/Axios";
import { CardTicket } from "../../../components/widgets/CardTicket";
import { Link } from "react-router-dom";

const HomeTickets = () => {
  const [tickets, setTickets] = useState({
    results: [],
    page: 1,
    totalDocs: 0,
  });
  const [page, setPage] = useState(1);

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
        const { data } = await api.post("/tickets/get-all", { page }, config);

        const count = await api.get("/tickets/count/total", config);

        setTickets((prevState) => ({
          ...prevState,
          results: [...prevState.results, ...data],
          page,
          totalDocs: count.data.totalDocs,
        }));
      } catch (error) {
        setTickets({
          results: [],
          page: 1,
          totalDocs: 0,
        });
      }
    })();
  }, [page]);

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
          {tickets.results.length ? (
            <>
              <ul>
                {tickets.results.map((ticket) => (
                  <li key={ticket._id}>
                    <CardTicket data={ticket} />
                  </li>
                ))}
              </ul>
              {tickets.totalDocs > tickets.results.length ? (
                <div className="py-5 text-center">
                  <button
                    onClick={() => setPage(page + 1)}
                    className="bg-gray-100 py-2 px-4 rounded-md"
                  >
                    Cargar más
                  </button>
                </div>
              ) : (
                <div className="py-5 text-center">
                  <p>No hay más tickets que mostrar</p>
                </div>
              )}
            </>
          ) : (
            <p>No hay tickets</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeTickets;
