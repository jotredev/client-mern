import useTicket from "../../../../hooks/useTicket";

/* eslint-disable react/prop-types */
const CloseTicket = () => {
  const { closeTicket } = useTicket();

  const onCloseTicket = async () => {
    await closeTicket();
  };

  return (
    <div className="mt-5">
      <button
        onClick={onCloseTicket}
        className="py-2 px-4 bg-green-500/10 text-green-500 rounded-md"
      >
        Cerrar ticket
      </button>
    </div>
  );
};

export default CloseTicket;
