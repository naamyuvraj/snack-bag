import React from 'react'
import Footer from "../pages/footer";

export default function ContactUs() {
  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-to-r from-[#050505] to-[#3c3c3c] pt-4"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <h1 className="text-center text-2xl text-[#238b45] font-semibold mt-4">Contact Us</h1>
      <hr className="border-1 border-[#238b45] mx-auto mt-3 w-1/2" />

      <div className="text-[#ECD9BA] text-lg mt-6 mx-10 space-y-4">
        <p>To contact us, you can reach out at:</p>
        <p>
          Email: <span className="text-[#238b45]">yoursnackbag@gmail.com</span>
        </p>
        <p>
          Phone: <span className="text-[#238b45]">+91 9153471582</span>
        </p>
        <p>
          Address: <span className="text-[#238b45]">Your Space Hostel, Porwal Road, Pune, Maharashtra</span>
        </p>
        <p>We are here to help you!</p>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}
