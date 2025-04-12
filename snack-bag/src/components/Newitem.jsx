import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function NewSnack({ name, image,price }) {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity(1);
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => {
      const newQuantity = prev - 1;
      return newQuantity < 0 ? 0 : newQuantity;
    });
  };

  return (
    <div className="w-1/2 m-auto bg-gradient-to-b from-[#0A6847] to-[#7ABA78] border border-gray-200 rounded-2xl shadow-md inline-block p-4 text-center transition hover:shadow-md hover:scale-[1.02]">
      <a href="#">
        <div className="h-48 w-full rounded-xl overflow-hidden flex items-center justify-center">
          <img
            className="h-full object-cover"
            src={image}
            alt={name}
          />
        </div>
      </a>

      <div className="p-3">
        <a href="#">
          <h5 className="mb-2 text-2xl font-mono font-bold tracking-tight text-[#F6E9B2]">
            {name}
          </h5>
        </a>

        <h5 className="bg-white rounded-2xl m-3 text-xl font-mono font-bold tracking-tight text-[#635b3a]">
        ₹ {price}    
        </h5>

        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#7ABA78] bg-[#F6E9B2] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <Plus className="w-4 h-4" />
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleDecrement}
              className="bg-[#F6E9B2] text-[#7ABA78] rounded-lg p-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-md font-medium text-[#F6E9B2]">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="bg-[#F6E9B2] text-[#7ABA78] rounded-lg p-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
