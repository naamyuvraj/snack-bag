import React from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const orderDetails = [
    {
      name: "Lays",
      qty: 5,
      photo:
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/a78914a9-b7b4-4d3b-9ad2-21f858b05f1f.jpg?ts=1740924664",
      price: 20,
    },
    {
      name: "Lays",
      qty: 5,
      photo:
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/a78914a9-b7b4-4d3b-9ad2-21f858b05f1f.jpg?ts=1740924664",
      price: 20,
    },
    {
      name: "Kurkure",
      qty: 5,
      photo:
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/a462e780-3f6f-47df-a451-1e63791d175b.jpg?ts=1740848082",
      price: 20,
    },
    {
      name: "Lays",
      qty: 5,
      photo:
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/a78914a9-b7b4-4d3b-9ad2-21f858b05f1f.jpg?ts=1740924664",
      price: 20,
    },
    {
      name: "Lays",
      qty: 5,
      photo:
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/a78914a9-b7b4-4d3b-9ad2-21f858b05f1f.jpg?ts=1740924664",
      price: 20,
    },
    {
      name: "Lays",
      qty: 5,
      photo:
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/a78914a9-b7b4-4d3b-9ad2-21f858b05f1f.jpg?ts=1740924664",
      price: 20,
    },
  ];
  const amountTopay = orderDetails
    .map((item) => item.price * item.qty)
    .reduce((acc, curr) => acc + curr);

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
          {orderDetails.map((item, index) => {
            return (
              <div className="mt-2" key={index}>
                <div className="flex rounded-3xl justify-center items-center p-2 border border-[#ECD9BA]/90 shadow-md">
                  {/* wrapper for one order */}
                  <div className="flex justify-evenly md:justify-evenly p-2">
                    {/* left side wala photo */}
                    <div className="flex flex-col w-30 h-30 justify-between">
                      {/* name div */}
                      <div className="text-xl text-[#ff6d6e] break-words">
                        {item.name}
                      </div>
                      {/* qty */}
                      <div className="flex items-center space-x-3">
                        <button className="text-4xl text-[#ECD9BA]">
                          <CiCirclePlus />
                        </button>
                        <span className="text-xl text-[#ECD9BA]">
                          {item.qty}
                        </span>
                        <button className="text-4xl text-[#ECD9BA]">
                          <CiCircleMinus />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* photo — middle wala */}
                  <div className="h-30 w-30 ml-3 rounded-3xl">
                    <img src={item.photo} alt={item.name} />
                  </div>

                  {/* amount — right wala */}
                  <div className="w-30 h-30 flex justify-center items-center p-4">
                    <div className="flex items-center space-x-2 text-[#ECD9BA] pr-1 rounded-lg text-xl">
                      <FaRupeeSign />
                      <h2>{item.qty * item.price}</h2>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* amount wala div */}
        <div className="mt-3 bg-[#ff6d6e] opacity-90 rounded-3xl p-4 mb-3 shadow-md border-2 border-[#ECD9BA]/90">
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
            <div className=" text-white px-4 py-2 rounded-lg">
              <select className="text-[#ECD9BA] bg-black border border-[#ECD9BA]/50 rounded-lg p-2 outline-none">
                <option disabled selected>
                  Proceed To Pay
                </option>
                <option value="upi">Pay via UPI</option>
                <option value="cod">Pay on Delivery</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
