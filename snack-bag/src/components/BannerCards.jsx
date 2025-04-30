import { Plus, Minus } from "lucide-react";
import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";

export default function BannerCard({ id, name, image, price, user_id }) {
  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState(0);
  const [lowStock, setLowStock] = useState(false);

  useEffect(() => {
    fetchQuantity();
    fetchStock();
  }, []);

  const fetchStock = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("quantity")
      .eq("id", id)
      .single();

    if (!error) setStock(data.quantity);
  };

  const fetchQuantity = async () => {
    const { data, error } = await supabase
      .from("carts")
      .select("quantity")
      .eq("user_id", user_id)
      .eq("product_id", id)
      .single();

    setQuantity(error ? 0 : data.quantity);
  };

  const handleAddToCart = async () => {
    if (stock <= 0) return;

    setQuantity(1);

    const { data: existing, error: fetchError } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", user_id)
      .eq("product_id", id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") return;

    if (existing) {
      await supabase
        .from("carts")
        .update({ quantity: 1 })
        .eq("user_id", user_id)
        .eq("product_id", id);
    } else {
      await supabase.from("carts").insert([
        {
          user_id,
          product_id: id,
          quantity: 1,
        },
      ]);
    }

    checkLowStock(1);
  };

  const handleIncrement = async () => {
    if (quantity >= stock) return;
    const newQty = quantity + 1;
    setQuantity(newQty);

    await supabase
      .from("carts")
      .update({ quantity: newQty })
      .eq("user_id", user_id)
      .eq("product_id", id);

    checkLowStock(newQty);
  };

  const handleDecrement = async () => {
    const newQty = quantity - 1;

    if (newQty <= 0) {
      setQuantity(0);
      await supabase
        .from("carts")
        .delete()
        .eq("user_id", user_id)
        .eq("product_id", id);
    } else {
      setQuantity(newQty);
      await supabase
        .from("carts")
        .update({ quantity: newQty })
        .eq("user_id", user_id)
        .eq("product_id", id);
    }

    checkLowStock(newQty);
  };

  const checkLowStock = (qty) => {
    setLowStock(stock - qty <= 2);
  };

  return (
    <div
      className="w-[180px] h-[280px] bg-[#238b45] backdrop-blur-sm opacity-100 border border-gray-200 rounded-2xl shadow-md p-3 text-center transition hover:shadow-md hover:scale-[1.02] flex flex-col justify-between"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <img
        className="rounded-xl w-full h-40 object-cover"
        src={image}
        alt={name}
      />

      <div className="w-full flex justify-center mt-2">
        <h5 className="text-sm font-semibold tracking-tight text-[#ECD9BA]">
          {name}
        </h5>
      </div>

      <div className="w-full flex justify-between items-center mt-2">
        <h5 className="text-lg font-semibold tracking-tight text-[#3c3c3c] ml-1 mt-1">
          ₹ {price}
        </h5>

        <div className="mt-3">
          {stock > 0 && quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center gap-2 px-2 py-1 text-sm font-medium text-[#ECD9BA]  rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 border border-[#ECD9BA]"
            >
              Add
            </button>
          ) : quantity > 0 ? (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handleDecrement}
                className="bg-[#F6E9B2] text-[#7ABA78] rounded-lg p-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-md font-medium text-[#F6E9B2]">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                disabled={quantity >= stock}
                className={`bg-[#F6E9B2] text-[#7ABA78] rounded-lg p-2 ${
                  quantity >= stock
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-800"
                } focus:ring-4 focus:outline-none focus:ring-blue-300`}
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Always show out-of-stock message at the bottom */}
      <div className="flex justify-center mt-2 flex-grow-0">
        {lowStock && stock > 0 && (
          <p className="text-yellow-200 text-sm">
            Hurry! Only {stock - quantity} left
          </p>
        )}
        {stock === 0 && (
          <p className="text-red-300 font-semibold text-sm">Out of stock</p>
        )}
      </div>
    </div>
  );
}
