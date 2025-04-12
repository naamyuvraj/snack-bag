import React from "react";

function OrderHistory() {
  // Fake orders data
  const orders = [
    {
      id: "987654321987654",
      productName: "Lays, Kurkure, Chips, Coke",
      date: "2025-04-10 3:30 PM",
      amount: "600",
      status: "Pending",
    },
    {
      id: "123456712345678",
      productName: "Kurkure, Chips, Coke",
      date: "2025-04-11 5:03 PM",
      amount: "500",
      status: "Completed",
    },
    {
      id: "456789123456789",
      productName: "Cola",
      date: "2025-04-09 12:15 PM",
      amount: "60",
      status: "Completed",
    },
  ];

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="bg-gradient-to-r from-[#050505] to-[#3c3c3c] min-h-screen w-full pb-10"
    >
      {/* Upper div for header */}
      <div className="pt-12 p-8 pb-10 bg-gradient-to-r from-[#050505] to-[#3c3c3c] border-b-2 border-red-200 text-3xl mb-8">
        <h1 className="text-[#ECD9BA]">Order History</h1>
      </div>

      {/* Display no orders message */}
      {orders.length === 0 ? (
        <div className="text-center text-xl text-gray-300 mt-10">
          No orders found!
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col bg-[#ECD9BA] opacity-85 p-6 m-4 border border-gray-200 rounded-xl shadow-xl hover:shadow-md transition"
          >
            {/* Product name and order ID */}
            <div className="flex justify-between items-start m-4 gap-9">
              <div className="bg-gray-50 p-3 shadow-md break-words w-[220px] h-[60px] overflow-y-auto rounded-xl text-gray-700 text-sm shadow-inner">
                <p>{order.productName}</p>
              </div>
              <div className="bg-gray-50 shadow-md text-gray-700 p-3 w-[150px] rounded-xl text-sm shadow-inner">
                {/* Static label */}
                <div className="text-xs text-gray-500 mb-1">Order ID</div>
                <div className="overflow-x-auto whitespace-nowrap">
                  {order.id}
                </div>
              </div>
            </div>

            {/* Time and amount */}
            <div className="flex justify-between items-center w-full bg-gray-50 shadow-md p-2 rounded-xl mb-4">
              <div className="text-sm text-gray-600">{order.date}</div>
              <div className="bg-white text-gray-800 px-4 py-1 rounded-full text-sm font-medium shadow">
                ₹{order.amount}
              </div>
            </div>

            {/* QR code and status */}
            <div className="flex justify-between items-center w-full bg-gray-50 shadow-md p-3 rounded-xl">
              <div className="bg-white text-gray-800 px-4 py-1 rounded-2xl text-sm font-medium shadow-md cursor-pointer hover:bg-gray-100 transition">
                QR Code
              </div>

              <div
                className={`px-4 py-1 rounded-full text-sm font-medium shadow ${
                  order.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Optional footer message */}
      <p className="text-[16px] text-[#238b45] mt-6 pt-2 mx-5">
        This is what you've ordered
      </p>
    </div>
  );
}

export default OrderHistory;
