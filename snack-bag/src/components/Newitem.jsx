import { Plus } from "lucide-react";

export default function NewSnack({ name, image }) {
  return (
    <div className="w-1/2 m-auto bg-gradient-to-b from-[#0A6847] to-[#7ABA78] border border-gray-200 rounded-2xl shadow-md inline-block p-4 text-center transition hover:shadow-md hover:scale-[1.02]">
      <a href="#">
        <img
          className="rounded-xl w-full object-cover h-48"
          src={image}
          alt={name}
        />
      </a>
      <div className="p-3">
        <a href="#">
          <h5 className="mb-2 text-2xl font-mono font-bold tracking-tight  text-[#F6E9B2]">
            {name}
          </h5>
        </a>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#7ABA78] bg-[#F6E9B2] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          <Plus className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
