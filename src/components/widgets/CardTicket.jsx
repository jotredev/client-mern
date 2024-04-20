/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { cn } from "../../lib/Utils";

export const CardTicket = ({ data }) => {
  const { title, category, shortDescription, _id, status } = data;

  return (
    <article className="bg-gray-100 mb-5 p-5 rounded-md">
      <div className="flex items-start gap-4">
        <i
          className={cn(
            "fi fi-rr-ticket text-2xl",
            status === "pending"
              ? "text-amber-500"
              : status === "inProcess"
              ? "text-sky-500"
              : "text-green-500"
          )}
        ></i>
        <div className="flex items-center">
          <Link
            to={`/tickets/${_id}`}
            className="text-xl font-medium hover:underline"
          >
            {title}
          </Link>
          <span className="text-sm bg-gray-200 py-0.5 px-2 rounded-md ml-2">
            {category}
          </span>
        </div>
      </div>
      <div>
        <p className="text-gray-500">{shortDescription}</p>
      </div>
    </article>
  );
};
