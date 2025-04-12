import React, { useState, useEffect } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amountTopay, setAmountToPay] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("carts")
          .select(
            `
            id,
            quantity,
            product_id,
            products (
              name,
              image_url,
              selling_price,
              quantity
            )
          `
          );

        if (error) {
          console.error("Error fetching cart items:", error);
        } else {
          setCartItems(data);

          // Calculate total amount to pay
          const totalAmount = data.reduce((acc, item) => {
            return acc + item.quantity * item.products.selling_price;
          }, 0);
          setAmountToPay(totalAmount);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (cartId, newQuantity, maxQuantity) => {
    if (newQuantity < 1) {
      // Show alert to confirm removal
      const confirmRemove = window.confirm(
        "Quantity is less than 1. Do you want to remove this product from the cart?"
      );
      if (confirmRemove) {
        try {
          const { error } = await supabase
            .from("carts")
            .delete()
            .eq("id", cartId);

          if (error) {
            console.error("Error removing product:", error);
          } else {
            // Remove the product from the cart items state
            setCartItems((prevItems) =>
              prevItems.filter((item) => item.id !== cartId)
            );

            // Recalculate the total amount to pay
            const updatedTotal = cartItems.reduce((acc, item) => {
              if (item.id !== cartId) {
                return acc + item.quantity * item.products.selling_price;
              }
              return acc;
            }, 0);
            setAmountToPay(updatedTotal);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        }
      }
      return;
    }

    if (newQuantity > maxQuantity) {
      alert(
        `Only ${maxQuantity} units of this product are available in stock.`
      );
      return;
    }

    try {
      const { error } = await supabase
        .from("carts")
        .update({ quantity: newQuantity })
        .eq("id", cartId);

      if (error) {
        console.error("Error updating quantity:", error);
      } else {
        // Update the cart items state
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === cartId ? { ...item, quantity: newQuantity } : item
          )
        );

        // Recalculate the total amount to pay
        const updatedTotal = cartItems.reduce((acc, item) => {
          const quantity =
            item.id === cartId ? newQuantity : item.quantity;
          return acc + quantity * item.products.selling_price;
        }, 0);
        setAmountToPay(updatedTotal);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="bg-gradient-to-r from-[#050505] to-[#3c3c3c] pt-7 w-full h-full "
    >
      {/* wrapper wala div */}
      <div className="md:w-full w-[400px] rounded-xl bg-gradient-to-r from-[#050505] to-[#3c3c3c] mx-auto flex flex-col h-screen mt-4 pl-3 pr-3 mb-4 ">
        {/* top wala div for cart and back button */}
        <div className="flex flex-row justify-between md:w-1/2 w-[230px] mt-5 mb-6">
          {/* back div */}
          <div
            className="text-5xl text-[#ECD9BA]"
            onClick={() => navigate("/")}
          >
            <button>
              <IoChevronBackCircleOutline />
            </button>
          </div>
          {/* cart wala div */}
          <div className="text-3xl mt-1 text-[#ECD9BA]">Cart</div>
        </div>

        <div className="flex-grow overflow-y-auto h-150">
          {cartItems.map((item, index) => {
            const product = item.products;
            return (
              <div className="mt-2" key={index}>
                <div className="flex rounded-3xl justify-center items-center p-2 border border-[#ECD9BA]/90 shadow-md">
                  {/* wrapper for one order */}
                  <div className="flex justify-evenly md:justify-evenly p-2">
                    {/* left side wala photo */}
                    <div className="flex flex-col w-30 h-30 justify-between">
                      {/* name div */}
                      <div className="text-xl text-[#238b45] break-words">
                        {product.name}
                      </div>
                      {/* qty */}
                      <div className="flex items-center space-x-3">
                        <button
                          className="text-4xl text-[#ECD9BA]"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1,
                              product.quantity
                            )
                          }
                        >
                          <CiCirclePlus />
                        </button>
                        <span className="text-xl text-[#ECD9BA]">
                          {item.quantity}
                        </span>
                        <button
                          className="text-4xl text-[#ECD9BA]"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1,
                              product.quantity
                            )
                          }
                        >
                          <CiCircleMinus />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* photo — middle wala */}
                  <div className="h-30 w-30 ml-3 rounded-3xl">
                    <img src={product.image_url} alt={product.name} />
                  </div>

                  {/* amount — right wala */}
                  <div className="w-30 h-30 flex justify-center items-center p-4">
                    <div className="flex items-center space-x-2 text-[#ECD9BA] pr-1 rounded-lg text-xl">
                      <FaRupeeSign />
                      <h2>{item.quantity * product.selling_price}</h2>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* amount wala div */}
        <div className="mt-3 bg-[#238b45] opacity-90 rounded-3xl p-4 mb-3 shadow-md border-2 border-[#ECD9BA]/90">
          {/* subtotal and total wala div ka wrapper */}
          <div className="flex flex-row justify-between mb-4 h-8 p-4 border border-[#ecd9ba] rounded-xl">
            <div className="flex items-center justify-center text-[#050505]">
              Total Amount
            </div>
            <div className="flex items-center justify-center text-2xl font-bold text-[#050505]">
              {amountTopay}
            </div>
          </div>

          {/* button ko center kara — proper way */}
          <div className="flex items-center justify-center w-full">
            <div className="text-white px- py-2 rounded-lg">
              <button
                className="text-[#ECD9BA] bg-black border border-[#ECD9BA]/50 rounded-lg p-2 outline-none"
                onClick={() => alert("Proceeding to pay via UPI")}
              >
                Proceed to Pay via UPI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
