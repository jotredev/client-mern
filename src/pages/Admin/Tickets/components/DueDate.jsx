import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { toast } from "sonner";
import useTicket from "../../../../hooks/useTicket";

const DueDate = () => {
  const today = new Date();
  const [dueDate, setDueDate] = useState(today);

  const { ticketInProcess } = useTicket();

  const onSubmit = async (e) => {
    e.preventDefault();

    // Resetar las horas de las fechas para poder seleccionar el día actual
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Validamos que la fecha seleccionada sea mayor o igual a la actual
    if (dueDate.getTime() >= today.getTime()) {
      await ticketInProcess({ dueDate });
    } else {
      return toast.error("La fecha no puede ser menor a hoy");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <DayPicker
        mode="single"
        required
        selected={dueDate}
        onSelect={setDueDate}
      />
      <button type="submit" className="py-2 px-4 rounded-md bg-gray-100">
        Enviar
      </button>
    </form>
  );
};

export default DueDate;
