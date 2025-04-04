import React from "react";
import NewSnack from "./Newitem";

export default function Snacks() {
  return (
    <>
    <div className="pb-10 h-screen bg-gradient-to-r from-[#222222] to-[#3b3b3b]">
    <div className="pt-10 w-[95%] m-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <NewSnack
          name="Lays Classic"
          image="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/da/cms-assets/cms/product/a462e780-3f6f-47df-a451-1e63791d175b.jpg?ts=1740848082"
        />
      </div>
      </div>
    </>
  );
}
