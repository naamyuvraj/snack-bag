import React from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function Cart() {
  const colors = ["#F7CFD8", "#F4F8D3", "#FFEDFA", "#C4BBE0" ,"#F1E7E7"];
  const navigate = useNavigate()

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
  const amountTopay = orderDetails.map((item) => item.price*item.qty).reduce((acc,curr) => acc+curr)

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* wrapper wala div */}
      <div className="md:w-full w-[400px] rounded-xl bg-slate-100 mx-auto flex flex-col h-screen mt-4 pl-3 pr-3 mb-4 border border-white/40" >
        {/* top wala div for cart and back button */}
        <div className="flex flex-row justify-between md:w-1/2 w-[230px] mt-5 mb-6">

          {/* back div */}
          <div className="text-5xl" onClick={()=> navigate("/")}>
            <button>
              <IoChevronBackCircleOutline />
            </button>
          </div>
          {/* cart wala div */}
          <div className="text-3xl mt-1">Cart</div>
        </div>

        <div className="flex-grow overflow-y-auto h-150">
          {orderDetails.map((item, index) => {
            return (
              <div className="mt-2" key={index}>
                <div
                  className="flex rounded-3xl justify-center items-center p-2 "
                  style={{ backgroundColor: colors[index % colors.length] }}
                >
                  {/* wrapper for one order */}
                  <div className="flex justify-evenly md:justify-evenly p-2">
                    {/* left side wala photo */}
                    <div className="flex flex-col w-30 h-30 justify-between">
                      {/* name div */}
                      <div className="text-lg break-words">{item.name}</div>
                      {/* qty */}
                      <div className="flex items-center space-x-2">
                        <button className="text-3xl">
                          <CiCirclePlus />
                        </button>
                        <span className="text-xl">{item.qty}</span>
                        <button className="text-3xl">
                          <CiCircleMinus />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* photo — middle wala */}
                  <div className="h-30 w-30 ml-3">
                    <img src={item.photo} alt={item.name} />
                  </div>

                  {/* amount — right wala */}
                  <div className="w-30 h-30 flex justify-center items-center p-4">
                    <div className="flex items-center space-x-2 bg-white pr-1 rounded-lg text-xl">
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
        <div className="mt-3 bg-slate-200 rounded-lg p-4 mb-3 shadow-md ">
          {/* subtotal and total wala div ka wrapper */}
          <div className="flex flex-row justify-between mb-4 h-8 p-4 border border-white rounded-xl">
            <div className="flex items-center justify-center">Total Amount</div>
            <div className="flex items-center justify-center">{amountTopay}</div>
          </div>

          {/* button ko center kara — proper way */}
          <div className="flex items-center justify-center w-full">
            <div className="bg-black text-white px-4 py-2 rounded-lg">
              <button>Proceed To Pay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
