import { Plus } from 'lucide-react';

export default function NewSnack({ name, image }) {
  return (
    <div className="w-1/2 m-auto bg-[#eba10e] border border-gray-200 rounded-lg shadow-sm inline-block p-4 text-center transition hover:shadow-md hover:scale-[1.02]">
      <a href="#">
        <img
          className="rounded-t-lg w-full object-cover h-48"
          src={image}
          alt={name}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {name}
          </h5>
        </a>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          <Plus className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
