import { useState } from "react";
import ReactQuill from "react-quill";
import { Toolbar } from "../../../lib/Quill";

import { toast } from "sonner";
import useTicket from "../../../hooks/useTicket";

const CreateTicketPage = () => {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("print");
  const { createTicket } = useTicket();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title || !shortDescription || !description || !category) {
      return toast.error("Todos los campos son obligatorios");
    }

    createTicket({ title, shortDescription, description, category });

    setTitle("");
    setShortDescription("");
    setDescription("");
    setCategory("print");
  };

  return (
    <div className="container mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-medium">Crear ticket</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="w-full relative">
            <label
              htmlFor="title"
              className="absolute -top-2 left-2 px-4 font-bold text-xs bg-white"
            >
              Titulo del ticket
            </label>
            <input
              id="title"
              type="text"
              className="w-full border border-gray-500/30 bg-transparent py-3 px-5 rounded-lg outline-none placeholder:text-gray-400"
              placeholder="La impresora esta fallando"
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Categoría</label>
            <select
              className="w-full appearance-none py-1 px-4 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="print">Impresoras</option>
              <option value="software">Software</option>
              <option value="hardware">Hardware</option>
            </select>
          </div>
        </div>
        <div className="w-full relative mb-8">
          <label
            htmlFor="description"
            className="absolute -top-2 left-2 px-4 font-bold text-xs bg-white"
          >
            Descripción corta
          </label>
          <textarea
            id="description"
            rows={5}
            className="w-full border border-gray-500/30 bg-transparent py-3 px-5 rounded-lg outline-none placeholder:text-gray-400 resize-none"
            placeholder="La impresora esta fallando"
            autoComplete="off"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>
        <div className="mb-8">
          <label className="font-medium">Descripción detallada</label>
          <ReactQuill
            theme="snow"
            modules={{
              toolbar: Toolbar,
            }}
            className="mt-5"
            value={description}
            onChange={setDescription}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white rounded-full py-3 px-5"
        >
          Crear ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicketPage;
