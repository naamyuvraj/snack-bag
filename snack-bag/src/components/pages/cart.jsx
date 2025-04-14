import React, { useState, useEffect } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
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
      const confirmRemove = window.confirm("Remove this item from cart?");
      if (confirmRemove) {
        const { error } = await supabase.from("carts").delete().eq("id", cartId);
        if (!error) {
          setCartItems((prev) => prev.filter((item) => item.id !== cartId));
          const updatedTotal = cartItems.reduce((acc, item) => {
            if (item.id !== cartId) {
              return acc + item.quantity * item.products.selling_price;
            }
            return acc;
          }, 0);
          setAmountToPay(updatedTotal);
        }
        return;
      }
    }

    if (newQuantity > maxQuantity) {
      alert(`Only ${maxQuantity} units available`);
      return;
    }

    const { error } = await supabase
      .from("carts")
      .update({ quantity: newQuantity })
      .eq("id", cartId);

    if (!error) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
      const updatedTotal = cartItems.reduce((acc, item) => {
        const quantity = item.id === cartId ? newQuantity : item.quantity;
        return acc + quantity * item.products.selling_price;
      }, 0);
      setAmountToPay(updatedTotal);
    }
  };

  const handlePayment = async () => {
    const options = {
      key: "rzp_test_NdIUXp3nJYVmif", // Replace with your Razorpay public key
      amount: amountTopay * 100,
      currency: "INR",
      name: "Snack Bag",
      description: "Order Payment",
      image: "https://your-logo-url.com/logo.png",
      handler: async function (response) {
        alert(`Payment Success! Payment ID: ${response.razorpay_payment_id}`);
  
        // Save the order
        const { error: orderError } = await supabase.from("orders_razorpay").insert([
          {
            user_id: "42ba3201-fb02-4cc5-8440-a963b3f4e44e", // Replace with actual user_id
            amount: amountTopay,
            payment_id: response.razorpay_payment_id,
          },
        ]);
  
        if (orderError) {
          console.error("Failed to save order:", orderError);
          return;
        }
  
        // ✅ Clear cart after successful order save
        const { error: clearCartError } = await supabase
          .from("carts")
          .delete()
          .eq("user_id", "da64fb2b-6e4f-48cf-b63c-b345fdeb448c"); // Replace with dynamic user_id if using auth
  
        if (clearCartError) {
          console.error("Failed to clear cart:", clearCartError);
        } else {
          alert("Order placed and cart cleared!");
          setCartItems([]);
          setAmountToPay(0);
          navigate("/");
        }
      },
      prefill: {
        name: "Yuvraj Mandal",
        email: "test@yuvraj.dev",
        contact: "9000090000",
      },
      theme: {
        color: "#238b45",
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  if (loading) return <h1>Loading...</h1>;

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="bg-gradient-to-r from-[#050505] to-[#3c3c3c] pt-7 w-full h-full"
    >
      <div className="md:w-full w-[400px] rounded-xl bg-gradient-to-r from-[#050505] to-[#3c3c3c] mx-auto flex flex-col h-screen mt-4 pl-3 pr-3 mb-4">
        <div className="flex flex-row justify-between md:w-1/2 w-[230px] mt-5 mb-6">
          <div className="text-5xl text-[#ECD9BA]" onClick={() => navigate("/")}>
            <button>
              <IoChevronBackCircleOutline />
            </button>
          </div>
          <div className="text-3xl mt-1 text-[#ECD9BA]">Cart</div>
        </div>

        <div className="flex-grow overflow-y-auto h-150">
          {cartItems.map((item, index) => {
            const product = item.products;
            return (
              <div className="mt-2" key={index}>
                <div className="flex rounded-3xl justify-center items-center p-2 border border-[#ECD9BA]/90 shadow-md">
                  <div className="flex justify-evenly md:justify-evenly p-2">
                    <div className="flex flex-col w-30 h-30 justify-between">
                      <div className="text-xl text-[#238b45] break-words">
                        {product.name}
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          className="text-4xl text-[#ECD9BA]"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1, product.quantity)
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
                            updateQuantity(item.id, item.quantity - 1, product.quantity)
                          }
                        >
                          <CiCircleMinus />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="h-30 w-30 ml-3 rounded-3xl">
                    <img src={product.image_url} alt={product.name} />
                  </div>

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

        <div className="mt-3 bg-[#238b45] opacity-90 rounded-3xl p-4 mb-3 shadow-md border-2 border-[#ECD9BA]/90">
          <div className="flex flex-row justify-between mb-4 h-8 p-4 border border-[#ecd9ba] rounded-xl">
            <div className="flex items-center justify-center text-[#050505]">
              Total Amount
            </div>
            <div className="flex items-center justify-center text-2xl font-bold text-[#050505]">
              {amountTopay}
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            <div className="text-white px- py-2 rounded-lg">
              <button
                className="text-[#ECD9BA] bg-black border border-[#ECD9BA]/50 rounded-lg p-2 outline-none"
                onClick={handlePayment}
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
