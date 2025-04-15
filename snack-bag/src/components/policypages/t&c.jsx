import Footer from "../pages/footer";

export default function TermsAndCond() {
  return (
    <div
      className="bg-gradient-to-r from-[#050505] to-[#3c3c3c] pt-7 w-full h-full"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <h1 className="text-center text-2xl text-[#238b45] font-semibold">
        Terms & Conditions
      </h1>
      <hr className="border-1 border-[#238b45] mx-auto mt-5" />

      <ul className="text-[#ECD9BA] text-lg mt-6 mx-10 list-disc list-inside space-y-4">
        <li>
          This service is currently available only for <br />
          <span className="text-[#238b45]">
            Your Space Hostel, Porwal Road, Pune, Maharashtra
          </span>
          .
        </li>
      </ul>

      <h1 className="text-center text-xl text-[#238b45] font-semibold mt-10">
        Acceptance of Terms
      </h1>

      <ul className="text-[#ECD9BA] text-lg mt-6 mx-10 list-disc list-inside space-y-4">
        <li>
          These <span className="text-[#238b45]">Terms</span> are intended to
          make you aware of your legal rights and responsibilities with respect
          to your access to and use of the
          <span className="text-[#238b45]"> SnackBag’s website</span>{" "}
          www.SnackBag.shop ("Site") and/or any related applications
          (collectively, the{" "}
          <span className="text-[#238b45]">Snack Bag Platform</span>), including
          services offered by <span className="text-[#238b45]">SnackBag</span>.
        </li>
        <li>
          Your use of the{" "}
          <span className="text-[#238b45]">SnackBag Platform</span> is governed
          by these Terms and the
          <span className="text-[#238b45]"> Privacy Policy</span> available at
          <span className="text-[#238b45]"> https://SnackBag.Shop/privacy</span>
          . By using the platform or placing an order, you agree to all these
          terms.
        </li>
        <li>
          The <span className="text-[#238b45]">Terms</span> may change without
          prior notice. Continued use of the platform implies your acceptance of
          those changes.
        </li>

        <h1 className="text-center text-xl text-[#238b45] font-semibold mt-10">
          Account Registration and Obligations
        </h1>

        <li>
          All users must{" "}
          <span className="text-[#238b45]">register and log in</span> to place
          orders. Ensure your account details are up to date. You also agree to
          receive
          <span className="text-[#238b45]"> communications</span> (promotional,
          transactional, etc.) from SnackBag.
        </li>
        <li>
          By registering your mobile number, you give consent to be contacted
          via
          <span className="text-[#238b45]">
            {" "}
            calls, SMS, apps, or other electronic modes
          </span>{" "}
          for order-related communication.
        </li>

        <h1 className="text-center text-xl text-[#238b45] font-semibold mt-10">
          Limited Licence
        </h1>

        <li>
          You agree not to{" "}
          <span className="text-[#238b45]">
            use, host, upload, publish, or transmit
          </span>{" "}
          any content on the SnackBag Platform that falls under
          <span className="text-[#238b45]"> “Prohibited Conduct”</span>.
        </li>
        <li>
          Attempts to do any of the above also constitute a
          <span className="text-[#238b45]"> violation</span>.
        </li>
      </ul>
      <h1 className="text-center text-xl text-[#238b45] font-semibold mt-10">
        User Responsibilities
      </h1>
      <ul className="text-[#ECD9BA] text-lg mt-4 mx-10 list-disc list-inside space-y-4">
        <li>
          You agree to use the{" "}
          <span className="text-[#238b45]">SnackBag Platform</span> only for
          lawful purposes and in a way that does not infringe the rights of
          others.
        </li>
        <li>
          You are responsible for maintaining the confidentiality of your{" "}
          <span className="text-[#238b45]">account credentials</span> and
          restricting access to your device.
        </li>
      </ul>

      <h1 className="text-center text-xl text-[#238b45] font-semibold mt-10">
        Pricing & Payment
      </h1>
      <ul className="text-[#ECD9BA] text-lg mt-4 mx-10 list-disc list-inside space-y-4">
        <li>
          All prices displayed on the platform are{" "}
          <span className="text-[#238b45]">inclusive of applicable taxes</span>,
          unless otherwise stated.
        </li>
        <li>
          Prices for products may change without prior notice. The final price
          during <span className="text-[#238b45]">checkout</span> will be
          applicable.
        </li>
        <li>
          Payments must be completed using{" "}
          <span className="text-[#238b45]">approved payment methods</span>.
          Refunds are governed by our Cancellation & Refund Policy.
        </li>
      </ul>

      <h1 className="text-center text-xl text-[#238b45] font-semibold mt-10">
        Prohibited Activities
      </h1>
      <ul className="text-[#ECD9BA] text-lg mt-4 mx-10 list-disc list-inside space-y-4">
        <li>
          You may not use the SnackBag Platform to engage in{" "}
          <span className="text-[#238b45]">
            fraudulent, abusive, or illegal
          </span>{" "}
          activities.
        </li>
        <li>
          Uploading or sharing content that is{" "}
          <span className="text-[#238b45]">
            harmful, threatening, defamatory, obscene, or otherwise
            objectionable
          </span>{" "}
          is strictly prohibited.
        </li>
        <li>
          Any attempt to disrupt the platform’s infrastructure or misuse
          services will be treated as a violation.
        </li>
      </ul>

      <h1 className="text-center text-xl text-[#238b45] font-semibold mt-10">
        Termination
      </h1>
      <ul className="text-[#ECD9BA] text-lg mt-4 mx-10 list-disc list-inside space-y-4">
        <li>
          SnackBag reserves the right to{" "}
          <span className="text-[#238b45]">
            suspend or permanently terminate
          </span>{" "}
          access to the platform if a user violates any Terms or engages in
          suspicious activity.
        </li>
        <li>
          Upon termination, all rights granted to you under these Terms will
          immediately cease.
        </li>
      </ul>

      <Footer />
    </div>
  );
}
