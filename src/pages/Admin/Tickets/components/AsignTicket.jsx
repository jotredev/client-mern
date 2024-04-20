import useTicket from "../../../../hooks/useTicket";

/* eslint-disable react/prop-types */
const AssingTicket = () => {
  const { assignUserSupport } = useTicket();

  const onSigned = async () => {
    await assignUserSupport();
  };

  return (
    <div className="mt-5">
      <button onClick={onSigned} className="py-2 px-4 bg-gray-100 rounded-md">
        Asignarme ticket
      </button>
    </div>
  );
};

export default AssingTicket;
