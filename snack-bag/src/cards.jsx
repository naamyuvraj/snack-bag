import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cards() {
  const navigate = useNavigate();
  return (
    <>
      <div class="pt-10 w-[95%] m-auto max-w-7xl">
        <div className="w-1/2 m-auto bg-gradient-to-b from-[#0A6847] to-[#7ABA78] border border-gray-200 rounded-2xl shadow-md inline-block p-4 text-center transition hover:shadow-md hover:scale-[1.02]">
          <a href="#">
            <img
              class="rounded-4xl "
              src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/da/cms-assets/cms/product/a462e780-3f6f-47df-a451-1e63791d175b.jpg?ts=1740848082"
              alt=""
            />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-mono font-bold tracking-tight  text-[#F6E9B2]">
                SNACKS
              </h5>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#7ABA78] bg-[#F6E9B2] rounded-xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"              onClick={() => navigate("/snacks")}
            >
              Explore
            </a>
          </div>
        </div>

        <div className="w-1/2 m-auto bg-gradient-to-t from-[#0A6847] to-[#7ABA78] border border-gray-200 rounded-2xl shadow-md inline-block p-4 text-center transition hover:shadow-md hover:scale-[1.02]">
          <a href="#">
            <img
              class="rounded-4xl "
              src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/da/cms-assets/cms/product/c6822994-e96a-4c54-ae53-d6d6210e259f.jpg?ts=1740295351"
              alt=""
            />
          </a>
          <div class="p-5">
            <a href="#">
            <h5 className="mb-2 text-2xl font-mono font-bold tracking-tight  text-[#F6E9B2]">
            DRINKS
              </h5>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#7ABA78] bg-[#F6E9B2] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"            >
              Explore
            </a>
          </div>
        </div>
      </div>

      <div class="pt-10 w-[95%] m-auto max-w-7xl">
        <div className="w-1/2 m-auto bg-gradient-to-t from-[#0A6847] to-[#7ABA78] border border-gray-200 rounded-2xl shadow-md inline-block p-4 text-center transition hover:shadow-md hover:scale-[1.02]">
          <a href="#">
            <img
              class="rounded-4xl "
              src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/app/assets/products/sliding_images/jpeg/1db82fc3-92a4-4174-9949-e82761f01514.jpg?ts=1708330362"
              alt=""
            />
          </a>
          <div class="p-5">
            <a href="#">
            <h5 className="mb-2 text-2xl font-mono font-bold tracking-tight  text-[#F6E9B2]">
            NAMKEENS
              </h5>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#7ABA78] bg-[#F6E9B2] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"            >
              Explore
            </a>
          </div>
        </div>
        <div className="w-1/2 m-auto bg-gradient-to-b from-[#0A6847] to-[#7ABA78] border border-gray-200 rounded-2xl shadow-md inline-block p-4 text-center transition hover:shadow-md hover:scale-[1.02]">
          <a href="#">
            <img
              class="rounded-4xl "
              src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1440/da/cms-assets/cms/product/029f9c6c-bdfc-41c8-acc4-e72e39836470.jpg?ts=1738757886"
              alt=""
            />
          </a>
          <div class="p-5">
            <a href="#">
            <h5 className="mb-2 text-2xl font-mono font-bold tracking-tight  text-[#F6E9B2]">
            BISCUITS
              </h5>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#7ABA78] bg-[#F6E9B2] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"            >
              Explore
            </a>
          </div>
        </div>
      </div>

      <div class="pt-10 w-[95%] m-auto max-w-7xl">
        <div className="w-1/2 m-auto bg-gradient-to-b from-[#0A6847] to-[#7ABA78] border border-gray-200 rounded-2xl shadow-md inline-block p-4 text-center transition hover:shadow-md hover:scale-[1.02]">
          <a href="#">
            <img
              class="rounded-4xl "
              src="https://cdn.grofers.com/da/cms-assets/cms/product/5f0298fc-56e5-4b83-9bae-1b364a34c23f.jpg?ts=1742804517"
              alt=""
            />
          </a>
          <div class="p-5">
            <a href="#">
            <h5 className="mb-2 text-2xl font-mono font-bold tracking-tight  text-[#F6E9B2]">
            CHOCOLATES
              </h5>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#7ABA78] bg-[#F6E9B2] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"            >
              Explore
            </a>
          </div>
        </div>
        <div className="w-1/2 m-auto bg-gradient-to-t from-[#0A6847] to-[#7ABA78] border border-gray-200 rounded-2xl shadow-md inline-block p-4 text-center transition hover:shadow-md hover:scale-[1.02]">
          <a href="#">
            <img
              class="rounded-4xl "
              src="https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/0de8b1ec-d655-4a8b-8622-f7dd915bfbc7.jpg?ts=1726835559"
              alt=""
            />
          </a>
          <div class="p-5">
            <a href="#">
            <h5 className="mb-2 text-2xl font-mono font-bold tracking-tight  text-[#F6E9B2]">
            NOODLES
              </h5>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#7ABA78] bg-[#F6E9B2] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
