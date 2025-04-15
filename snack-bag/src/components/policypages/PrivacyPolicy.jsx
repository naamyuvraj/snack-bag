import React from "react";
import Footer from "../pages/footer";
export default function PrivacyPolicy() {
  return (
    <div
      className="bg-gradient-to-r from-[#050505] to-[#3c3c3c] pt-7 w-full h-full"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <h1 className="text-center text-2xl text-[#238b45] font-semibold mt-10">
        Privacy Policy
      </h1>
      <hr className="border-1 border-[#238b45] mx-auto mt-3 w-1/2" />
      <ul className="text-[#ECD9BA] text-lg mt-6 mx-10 list-disc list-inside space-y-4">
        <li>
          We at <span className="text-[#238b45]">SnackBag</span> are committed
          to protecting your personal information and your right to privacy.
        </li>
        <li>
          We collect personal information such as your name, phone number,
          address, and payment details solely for processing your orders and
          improving our services.
        </li>
        <li>
          Your information will not be sold or shared with third parties except:
          <ul className="list-decimal ml-6 mt-2 space-y-2">
            <li>When required by law or legal proceedings.</li>
            <li>
              To trusted partners assisting in order delivery or payment
              processing under strict confidentiality.
            </li>
          </ul>
        </li>
        <li>
          All transactions on the platform are processed using secure encryption
          technology to protect your data.
        </li>
        <li>
          We may use cookies to personalize your experience and improve website
          functionality.
        </li>
        <li>
          By using the SnackBag platform, you agree to our privacy practices
          described above.
        </li>
      </ul>
      <Footer />
    </div>
  );
}
