import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[]] text-[#ECD9BA] py-10 shadow-inner">
      <hr className="border-1 border-[#ECD9BA] mx-auto mb-6 w-[95%]" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

        {/* Links in two rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-lg font-medium text-center md:text-left">
          <span className="cursor-pointer hover:underline" onClick={() => navigate("/about")}>
            About Us
          </span>
          <span className="cursor-pointer hover:underline" onClick={() => navigate("/contact")}>
            Contact Us
          </span>
          <span className="cursor-pointer hover:underline" onClick={() => navigate("/terms")}>
            Terms & Conditions
          </span>
          <span className="cursor-pointer hover:underline" onClick={() => navigate("/policy")}>
            Privacy Policy
          </span>
          <span className="cursor-pointer hover:underline" onClick={() => navigate("/cancellation")}>
            Cancellation & Refund
          </span>
        </div>

        {/* Brand */}
        <div className="space-y-1 mt-4 md:mt-0">
          <h3 className="text-2xl font-bold">
            <span className="text-[#238b45]">Snack</span> Bag
          </h3>
          <p className="text-sm">
            Made with ❤️ by <span className="text-[#238b45]">Snack</span> Bag Team
          </p>
          <p className="text-sm">&copy; 2025 Snack Bag. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
