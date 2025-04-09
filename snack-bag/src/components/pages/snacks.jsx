import React from "react";
import NewSnack from "../Newitem";

export default function Snacks() {
  return (
    <>
      <div className="pb-10 h-screen bg-[#F3CA52] pt-7">
      <div class="pt-10 w-[95%] m-auto max-w-7xl">
          <NewSnack
            name="Lays Classic"
            image="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/da/cms-assets/cms/product/a462e780-3f6f-47df-a451-1e63791d175b.jpg?ts=1740848082"
          />
          <NewSnack
            name="Lays Classic"
            image="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/da/cms-assets/cms/product/a462e780-3f6f-47df-a451-1e63791d175b.jpg?ts=1740848082"
          />
          {/* <NewSnack
            name="Lays Classic"
            image="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/da/cms-assets/cms/product/a462e780-3f6f-47df-a451-1e63791d175b.jpg?ts=1740848082"
          />
          <NewSnack
            name="Lays Classic"
            image="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/da/cms-assets/cms/product/a462e780-3f6f-47df-a451-1e63791d175b.jpg?ts=1740848082"
          /> */}
        </div>
      </div>
    </>
  );
}
