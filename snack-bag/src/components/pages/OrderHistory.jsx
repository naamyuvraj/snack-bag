import React from "react";

function OrderHistory() {
  // Fake orders data
  const orders = [
    {
      id: "987654321987654",
      productName: "Lays,kurkure,chips,coke",
      date: "10-4-2025 3:30 pm",
      amount: "600",
      status: "Pending",
    },
    {
      id: "123456712345678",
      productName: "kurkure,chips,coke",
      date: "11-4-2025 5:03 pm",
      amount: "500",
      status: "Completed",
    },
    {
      id: "456789123456789",
      productName: "colke",
      date: "09-4-2025 12:15 pm",
      amount: "60",
      status: "Completed",
    },
  ];

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="bg-gradient-to-r from-[#050505] to-[#3c3c3c] min-h-screen w-full pb-10"
    >
      {/* upper div for header  */}

      {/* text wala div */}
      <div className="pt-10 p-6 bg-gradient-to-r from-[#050505] to-[#3c3c3c] border-b-2 border-red-200 text-3xl mb-5">
          <h1 className="text-[#ECD9BA]">Order History</h1>
      </div>

      {/* order cards mapping */}
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col bg-[#ECD9BA] opacity-85 p-6 m-4 border border-gray-200 rounded-xl shadow-xl hover:shadow-md transition"
        >
          {/* product name and order id */}
          <div className="flex justify-between items-start m-4 gap-9">
            {/* product name */}
            <div className="bg-gray-50 p-3 shadow-md break-words w-[220px] h-[60px] overflow-y-auto rounded-xl text-gray-700 text-sm shadow-inner">
              <p>{order.productName}</p>
            </div>

            {/* order id */}
            <div className="bg-gray-50  shadow-md text-gray-700 p-3 w-[150px] rounded-xl text-sm shadow-inner">
              {/* Static label */}
              <div className="text-xs text-gray-500 mb-1">Order ID</div>

              {/* Scrollable order number */}
              <div className="overflow-x-auto whitespace-nowrap">
                {order.id}
              </div>
            </div>
          </div>

          {/* time and amount */}
          <div className="flex justify-between items-center w-full bg-gray-50 shadow-md p-2 rounded-xl mb-4">
            {/* time and date */}
            <div className="text-sm text-gray-600">{order.date}</div>

            {/* amount total */}
            <div className="bg-white text-gray-800 px-4 py-1 rounded-full text-sm font-medium shadow">
              ₹{order.amount}
            </div>
          </div>

          {/* qr code and status */}
          <div className="flex justify-between items-center w-full bg-gray-50 shadow-md p-3 rounded-xl">
            {/* qr code */}
            <div className="bg-white text-gray-800 px-4 py-1 rounded-2xl text-sm font-medium shadow-md cursor-pointer hover:bg-gray-100 transition">
              QR Code
            </div>

            {/* status */}
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
      ))}
                <p className="text-[16px] text-[#238b45] pt-2 mx-5">This is what you have all ordered</p>

    </div>
  );
}

export default OrderHistory;
