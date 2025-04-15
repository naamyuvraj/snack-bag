import React from "react";
import Footer from "../pages/footer";
export default function Cancellation() {
    return (
      <div
        className="flex flex-col min-h-screen bg-gradient-to-r from-[#050505] to-[#3c3c3c]"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Main Content */}
        <div className="flex-grow pt-12">
          <h1 className="text-center text-2xl text-[#238b45] font-semibold">
            Cancellation and Refund Policy
          </h1>
          <hr className="border-1 border-[#238b45] mx-auto mt-5 " />
          <ul className="text-[#ECD9BA] text-lg mt-6 mx-10 list-disc list-inside space-y-4">
            <li>
              This service is currently available only for 
              <span className="text-[#238b45]"> Your Space Hostel, Porwal Road, Pune, Maharashtra</span>. 
              Orders placed for other locations will be canceled and refunded.
            </li>
            <li>
              Refunds will be initiated within 
              <span className="text-[#238b45]"> 7 working days</span>.
            </li>
            <li>
              The refund will be processed to the 
              <span className="text-[#238b45]"> original mode of payment</span>.
            </li>
            <li>
              A refund will be initiated only if the order is 
              <span className="text-[#238b45]"> canceled before delivery</span>.
            </li>
          </ul>
        </div>
  
        {/* Footer Always at Bottom */}
        <Footer />
      </div>
    );
  }
  