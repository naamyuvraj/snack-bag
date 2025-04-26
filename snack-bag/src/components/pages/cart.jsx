import React, { useState, useEffect } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import useUser from "../../useUser";
import LoadingPage from "../Loading";

function Cart() {
  const navigate = useNavigate();
  const user = useUser();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amountTopay, setAmountToPay] = useState(0);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) return;

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
          )
          .eq("user_id", user.id);

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
  }, [user]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("users")
        .select("name, email, phone_number")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
      } else {
        setProfile(data);
      }
    };

    fetchUserProfile();
  }, [user]);

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
    if (!user || !profile) return;

    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData?.session?.access_token;

    try {
      const res = await fetch(
        "https://ettqxkemkniooiqstkou.supabase.co/functions/v1/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ amount: amountTopay * 100 }),
        }
      );

      const orderData = await res.json();
      if (orderData.error) throw new Error(orderData.error);

      const orderedProducts = cartItems.map((item) => ({
        name: item.products.name,
        product_id: item.product_id,
        quantity: item.quantity,
      }));

      const options = {
        key: "rzp_live_alNgd3kLZw4sM0",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Snack Bag",
        description: "Order Payment",
        order_id: orderData.id,
        handler: async function (response) {
          if (!response.razorpay_payment_id) {
            alert("Payment was cancelled or failed.");
            return;
          }

          alert(`Payment Success! Payment ID: ${response.razorpay_payment_id}`);

          const { error: insertError } = await supabase.from("orders_razorpay").insert([
            {
              user_id: user.id,
              amount: amountTopay,
              payment_id: response.razorpay_payment_id,
              user_name: profile?.name,
              products: orderedProducts,
            },
          ]);

          if (insertError) {
            console.error("Insert order failed:", insertError);
            alert("Order couldn't be saved. Please contact support.");
            return;
          }

          await supabase.from("carts").delete().eq("user_id", user.id);

          for (const item of orderedProducts) {
            const { data: productData, error: fetchError } = await supabase
              .from("products")
              .select("quantity")
              .eq("id", item.product_id)
              .single();

            if (fetchError) {
              console.error(`Error fetching product ${item.product_id}:`, fetchError);
              continue;
            }

            const currentQty = productData.quantity;
            const newQty = currentQty - item.quantity;

            if (newQty < 0) {
              console.warn(`Not enough stock for product ${item.product_id}`);
              continue;
            }

            const { error: updateError } = await supabase
              .from("products")
              .update({ quantity: newQty })
              .eq("id", item.product_id);

            if (updateError) {
              console.error(`Error updating quantity for ${item.product_id}:`, updateError);
            }
          }

          alert("Thank you for your order! Please collect it from Room 315.");
          setCartItems([]);
          setAmountToPay(0);
          navigate("/history");
        },
        prefill: {
          name: profile?.name || "Customer",
          email: profile?.email || "email@example.com",
          contact: profile?.phone_number || "9000090000",
        },
        theme: {
          color: "#238b45",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err.message);
      alert("Something went wrong during payment. Please try again.");
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="bg-gradient-to-r from-[#050505] to-[#3c3c3c] pt-2 w-full min-h-screen"
    >
      <div className="md:w-full w-[400px] rounded-xl bg-gradient-to-r from-[#050505] to-[#3c3c3c] mx-auto flex flex-col h-screen pl-3 pr-3">
        <div className="flex flex-row justify-between md:w-1/2 w-[230px] mt-5 mb-6">
          <div
            className="text-5xl text-[#ECD9BA]"
            onClick={() => navigate("/")}
          >
            <button>
              <IoChevronBackCircleOutline />
            </button>
          </div>
          <div className="text-2xl mt-1 text-[#ECD9BA]">Cart</div>
        </div>

        <div className="flex-grow overflow-y-auto h-150">
          {cartItems.length === 0 ? (
            <div className="text-center text-[#ECD9BA] text-xl mt-10">
              Your cart is empty 🛒
            </div>
          ) : (
            cartItems.map((item, index) => {
              const product = item.products;
              return (
                <div className="mt-2" key={index}>
                  <div className="flex rounded-xl justify-center items-center pt-2 pb-2 border border-[#ECD9BA]/90 shadow-xl">
                    <div className="flex justify-evenly pt-2 pb-2">
                      <div className="flex flex-col w-30 h-30 justify-between">
                        <div className="text-lg text-[#238b45] break-words mt-3">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-3 mb-2">
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

                    <div className="h-25 w-25 mx-5 rounded-3xl">
                      <img src={product.image_url} alt={product.name} />
                    </div>

                    <div className="text-lg text-[#ECD9BA] text-right flex flex-col items-center">
                      <div className="font-bold flex items-center gap-1">
                        <FaRupeeSign /> {item.quantity * product.selling_price}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <div className="flex justify-between mt-5 border border-[#ECD9BA]/90 p-7 rounded-xl">
              <div className="text-xl text-[#ECD9BA] ml-6">Total: </div>
              <div className="text-xl font-semibold text-[#238b45] inline-flex items-center gap-1 mr-6 ">
                <FaRupeeSign /> {amountTopay}
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={!profile}
              className={`mt-6 mb-16 py-4 font-semibold rounded-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center ${
                !profile
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-[#238b45] text-[#ECD9BA] hover:bg-orange-600"
              }`}
            >
              Proceed to Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
