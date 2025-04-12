import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cards() {
  // const navigate = useNavigate();
  function Cateogry({ name, image, path }) {
    const navigate = useNavigate();

    return (
      <>
        <div
          className="w-[46%] m-auto bg-[#238b45] backdrop-blur-sm  opacity-100 mx-2 border border-gray-200 rounded-2xl shadow-md inline-block p-3 px-5 text-center transition hover:shadow-md hover:scale-[1.02]"
          onClick={() => navigate(path)}
        >
          <a href="#">
            <img className="rounded-4xl " src={image} alt="" />
          </a>
          <div className="p-5">
            <div className="w-full flex justify-center">
              <h5 className="mx-auto text-center text-xl font-sans font-bold tracking-tight  text-[#ECD9BA] ">
                {name}
              </h5>
            </div>
            <a href="#" className="text-[.6rem] font-medium text-[#ECD9BA] ">
              Explore →
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="pt-10 w-[95%] m-auto max-w-7xl flex justify-between">
        <Cateogry
          name="SNACKS"
          image="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/da/cms-assets/cms/product/a462e780-3f6f-47df-a451-1e63791d175b.jpg?ts=1740848082"
          path="/snacks"
        />

        <Cateogry
          name="DRINKS"
          image="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/da/cms-assets/cms/product/c6822994-e96a-4c54-ae53-d6d6210e259f.jpg?ts=1740295351"
          path="/drinks"
        />
      </div>

      <div className="pt-10 w-[95%] m-auto max-w-7xl flex justify-between">
        <Cateogry
          name="NAMKEENS"
          image="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/app/assets/products/sliding_images/jpeg/1db82fc3-92a4-4174-9949-e82761f01514.jpg?ts=1708330362"
          path="/namkeens"
        />
        <Cateogry
          name="BISCUITS"
          image="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/da/cms-assets/cms/product/029f9c6c-bdfc-41c8-acc4-e72e39836470.jpg?ts=1738757886"
          path="/biscuits"
        />
      </div>

      <div className="pt-10 w-[95%] m-auto max-w-7xl flex justify-between">
        <Cateogry
          name="CHOCOLATES"
          image="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/da/cms-assets/cms/product/5f0298fc-56e5-4b83-9bae-1b364a34c23f.jpg?ts=1742804517"
          path="/chocolates"
        />
        <Cateogry
          name="NOODLES"
          image="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/app/assets/products/sliding_images/jpeg/0de8b1ec-d655-4a8b-8622-f7dd915bfbc7.jpg?ts=1726835559"
          path="/noodles"
        />
      </div>
    </>
  );
}
