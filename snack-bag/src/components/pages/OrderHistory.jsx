import React, { useState, useEffect } from "react";
import useUser from "../../useUser";
import { supabase } from "../../supabaseClient";
import QRCode from "react-qr-code";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../Loading";
export default function OrderHistory() {
  const user = useUser();
  const [orders, setOrders] = useState([]);
  const [scannedOrders, setScannedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQRData, setSelectedQRData] = useState(null);
  const navigate = useNavigate();

  const formatDateTime = (iso) => {
    const dt = new Date(iso);
    return dt.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  useEffect(() => {
    if (!user) return;

    const fetchOrdersAndScanned = async () => {
      setLoading(true);

      const { data: orderData, error: orderError } = await supabase
        .from("orders_razorpay")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (orderError) {
        console.error("Error fetching orders:", orderError);
        setLoading(false);
        return;
      }

      setOrders(orderData);

      const { data: scannedData, error: scannedError } = await supabase
        .from("scanned_orders")
        .select("order_id");

      if (scannedError) {
        console.error("Error fetching scanned orders:", scannedError);
      } else {
        setScannedOrders(scannedData.map((entry) => entry.order_id));
      }

      setLoading(false);
    };

    fetchOrdersAndScanned();
  }, [user]);

  if (loading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="bg-gradient-to-r from-[#050505] to-[#3c3c3c] min-h-screen w-full pb-10 pt-3"
    >
      
      <div className="flex flex-row justify-between md:w-1/2 w-[230px] mt-5 mb-4">
        <div className="text-5xl text-[#ECD9BA] px-5" onClick={() => navigate("/profile")}>
          <button>
            <IoChevronBackCircleOutline />
          </button>
        </div>
        <div className="text-2xl mt-1 text-[#ECD9BA]">My Orders</div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center text-xl text-gray-300 mt-10">
          No orders found!
        </div>
      ) : (
        orders.map((order) => {
          const isScanned = scannedOrders.includes(order.id);
          const status = isScanned ? "Completed" : "Pending";

          const qrPayload = {
            order_id: order.id,
            products: order.products?.map((p) => ({
              name: p.name,
              quantity: p.quantity,
            })),
            amount: order.amount,
            user_name: user?.user_metadata?.name || user?.email || "Unknown",
          };

          return (
            <div
              key={order.id}
              className="flex flex-col bg-[#ECD9BA] opacity-85 p-6 m-4 border border-gray-200 rounded-xl shadow-xl hover:shadow-md transition"
            >
              <div className="flex justify-between items-start m-4 gap-9">
                <div className="bg-gray-50 p-3 shadow-md break-words w-[220px] h-[60px] overflow-y-auto rounded-xl text-gray-700 text-sm shadow-inner">
                  {Array.isArray(order.products) &&
                    order.products.map((p, index) => (
                      <div key={index}>
                        {p.name} - {p.quantity}
                      </div>
                    ))}
                </div>
                <div className="bg-gray-50 shadow-md text-gray-700 p-3 w-[150px] rounded-xl text-sm shadow-inner">
                  <div className="text-xs text-gray-500 mb-1">Order ID</div>
                  <div className="overflow-x-auto whitespace-nowrap">
                    {order.id}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center w-full bg-gray-50 shadow-md p-2 rounded-xl mb-4">
                <div className="text-sm text-gray-600">
                  {formatDateTime(order.created_at)}
                </div>
                <div className="bg-white text-gray-800 px-4 py-1 rounded-full text-sm font-medium shadow">
                  ₹{order.amount}
                </div>
              </div>

              <div className="flex justify-between items-center w-full bg-gray-50 shadow-md p-3 rounded-xl">
                <div
                  className="bg-[white] text-gray-800 px-4 py-1 rounded-2xl text-sm font-medium shadow-md cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => setSelectedQRData(qrPayload)}
                >
                  Show QR Code
                </div>
                <div
                  className={`px-4 py-1 rounded-full text-sm font-medium shadow ${
                    status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {status}
                </div>
              </div>
            </div>
          );
        })
      )}

      <p className="text-[16px] text-[#238b45] mt-6 pt-2 mx-5">
        This is what you've ordered
      </p>

      {/* === QR Code Modal === */}
      {selectedQRData && (
        <div className="fixed inset-0 bg-[#238b45] bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#ECD9BA] p-6 rounded-2xl shadow-xl max-w-[90%] w-[300px] text-center">
            <h2 className="text-lg font-semibold mb-4">Scan this QR</h2>
            <QRCode value={JSON.stringify(selectedQRData)} />
            <button
              onClick={() => setSelectedQRData(null)}
              className="mt-6 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
