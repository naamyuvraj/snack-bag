import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { supabase } from "../supabaseClient";

export default function NewSnack({ id, name, image, price, user_id }) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetchQuantity();
  }, []);

  const fetchQuantity = async () => {
    const { data, error } = await supabase
      .from("carts")
      .select("quantity")
      .eq("user_id", user_id) // Ensure user_id is in correct format
      .eq("product_id", id)  // Ensure product_id is in correct format (UUID)
      .single();
  
    if (error) {
      console.error("Error fetching cart quantity:", error.message);
      setQuantity(0); // If not found, set quantity to 0
    } else {
      setQuantity(data.quantity); // Update the state with fetched quantity
    }
  };
    
  const handleAddToCart = async () => {
    setQuantity(1);

    const { data: existing, error: fetchError } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", user_id)
      .eq("product_id", id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking cart:", fetchError);
      return;
    }

    if (existing) {
      const { error } = await supabase
        .from("carts")
        .update({ quantity: 1 })
        .eq("user_id", user_id)
        .eq("product_id", id);
      if (error) console.error("Update failed:", error);
    } else {
      const { error } = await supabase.from("carts").insert([
        {
          user_id,
          product_id: id,
          quantity: 1,
        },
      ]);
      if (error) console.error("Insert failed:", error);
    }
  };

  const handleIncrement = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    const { error } = await supabase
      .from("carts")
      .update({ quantity: newQuantity })
      .eq("user_id", user_id)
      .eq("product_id", id);

    if (error) console.error("Increment failed:", error);
  };

  const handleDecrement = async () => {
    const newQuantity = quantity - 1;

    if (newQuantity <= 0) {
      setQuantity(0);
      const { error } = await supabase
        .from("carts")
        .delete()
        .eq("user_id", user_id)
        .eq("product_id", id);

      if (error) console.error("Delete failed:", error);
    } else {
      setQuantity(newQuantity);
      const { error } = await supabase
        .from("carts")
        .update({ quantity: newQuantity })
        .eq("user_id", user_id)
        .eq("product_id", id);

      if (error) console.error("Decrement failed:", error);
    }
  };

  return (
    <div className="w-[46%] m-auto bg-[#ff6d6e] backdrop-blur opacity-90 ml-4 border border-gray-200 rounded-2xl shadow-md inline-block p-3 text-center transition hover:shadow-md hover:scale-[1.02]">
      <img
        className="rounded-xl w-full object-cover h-48"
        src={image}
        alt={name}
      />

      <div className="p-3">
        <h5 className="mb-2 text-2xl font-mono font-bold tracking-tight  text-[#ECD9BA]">
          {name}
        </h5>

        <h5 className="bg-white rounded-2xl m-3 text-xl font-mono font-bold tracking-tight text-[#635b3a]">
          ₹ {price}
        </h5>

        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#7ABA78] bg-[#ECD9BA] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
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
            <span className="text-md font-medium text-[#F6E9B2]">
              {quantity}
            </span>
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
