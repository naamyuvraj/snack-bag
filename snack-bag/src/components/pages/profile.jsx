import React, { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import useUser from "../../useUser"; 
import { supabase } from "../../supabaseClient";

export default function User() {
  const navigate = useNavigate();
  const user = useUser();
  const [userInfo, setUserInfo] = useState(null);

  // Redirect if user is not logged in
  useEffect(() => {
    if (user === undefined) return; // still loading
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user?.id) return;
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      if (!error) setUserInfo(data);
      else console.error(error);
    };
    fetchUserInfo();
  }, [user]);

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // Single handler for login/logout button
  const handleAuthAction = () => {
    if (user) handleLogout();
    else navigate("/login");
  };

  if (user === undefined) {
    return <div className="text-center pt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#000000] to-[#3c3c3c] py-10 px-5 font-[Poppins,sans-serif]">
      {/* Header */}
      <div className="flex justify-between md:w-1/2 w-[230px] mb-4">
        <button className="text-5xl text-[#ECD9BA]" onClick={() => navigate("/")}>
          <IoChevronBackCircleOutline />
        </button>
        <div className="text-3xl mt-1 text-[#ECD9BA]">My Profile</div>
      </div>

      <hr className="border-[#ECD9BA] mx-auto mb-7 w-[95%]" />

      {/* User Info */}
      <div className="bg-[#1f1f1f] rounded-2xl shadow-lg p-5 flex items-center gap-9 max-w-xl mx-auto mb-10 hover:scale-[1.01] transition">
        <CircleUserRound className="text-[#238b45] w-20 h-20" />
        <div>
          <p className="text-lg text-[#238b45] font-medium">
            {userInfo?.name || "Guest"}
          </p>
          <p className="text-sm text-[#ECD9BA]">Room: {userInfo?.room_number}</p>
          <p className="text-sm text-[#ECD9BA]">Phone: {userInfo?.phone_number}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div
        className="bg-[#1f1f1f] rounded-2xl shadow-md p-4 mb-4 cursor-pointer hover:bg-[#2c2c2c] transition max-w-xl mx-auto flex items-center justify-between group"
        onClick={() => navigate("/history")}
      >
        <h3 className="text-xl text-[#ECD9BA] font-semibold group-hover:text-[#ff6d6e]">
          View Order History
        </h3>
        <span className="text-[#238b45] font-bold text-2xl group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>

      <div
        className="bg-[#1f1f1f] rounded-2xl shadow-md p-4 mb-6 cursor-pointer hover:bg-[#2c2c2c] transition max-w-xl mx-auto flex items-center justify-between group"
        onClick={() => navigate("/contact")}
      >
        <h3 className="text-xl text-[#ECD9BA] font-semibold group-hover:text-[#ff6d6e]">
          Contact Us
        </h3>
        <span className="text-[#238b45] font-bold text-2xl group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>

      {/* Login / Logout */}
      <div
        className="bg-[#1f1f1f] rounded-2xl shadow-md p-4 cursor-pointer hover:bg-[#2c2c2c] transition max-w-xl mx-auto flex items-center justify-between group"
        onClick={handleAuthAction}
      >
        <h3 className="text-xl text-[#ECD9BA] font-semibold group-hover:text-[#ff6d6e]">
          {user ? "Logout" : "Login"}
        </h3>
        <span className="text-[#238b45] font-bold text-2xl group-hover:translate-x-1 transition-transform">
          {user ? "⎋" : "→"}
        </span>
      </div>
    </div>
  );
}
