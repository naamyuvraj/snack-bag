import React from "react";
import Footer from "../pages/footer";

export default function ShippingAndDelivery() {
  return (
    <div
      className="bg-gradient-to-r from-[#050505] to-[#3c3c3c] pt-4 w-full h-screen"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <h1 className="text-center text-2xl text-[#238b45] font-semibold mt-4">
        Shipping & Delivery Policy
      </h1>
      <hr className="border-1 border-[#238b45] mx-auto mt-3 w-[50%]" />
      <ul className="text-[#ECD9BA] text-lg mt-6 mx-10 list-disc list-inside space-y-4">
        <li>
          For <span className="text-[#238b45]">international buyers</span>, orders are shipped and delivered through registered international courier companies and/or international speed post only.
        </li>
        <li>
          For <span className="text-[#238b45]">domestic buyers</span>, orders are shipped through registered domestic courier companies and/or speed post only.
        </li>
        <li>
          Orders are shipped within 0-7 days or as per the delivery date agreed at the time of order confirmation, subject to courier company or post office norms.
        </li>
        <li>
          <span className="text-[#238b45]">SnackBag</span> is not liable for any delay in delivery by the courier company or postal authorities and only guarantees to hand over the consignment within 0-7 days from the date of the order and payment or as per the agreed delivery date.
        </li>
        <li>
          Delivery of all orders will be made to the address provided by the buyer at the time of placing the order.
        </li>
        <li>
          Delivery confirmation will be sent to your email ID as specified during registration.
        </li>
        <li>
          For any issues in utilizing our services, you may contact our helpdesk at{" "}
          <span className="text-[#238b45]">9153471582</span> or email us at{" "}
          <span className="text-[#238b45]">yoursnackbag@gmail.com</span>.
        </li>
      </ul>
      <Footer />
    </div>
  );
}
