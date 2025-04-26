import React from "react";
import NewSnack from "../Newitem";
import { supabase } from "../../supabaseClient";
import { useState, useEffect } from "react";
import LoadingPage from "../Loading";
import  useUser  from "../../useUser"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { ShoppingCart } from "lucide-react";
export default function Namkeens() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const  user  = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "Namkeens");

      if (error) {
        console.error("Data nahi aya", error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="pb-15 bg-gradient-to-r from-[#000000] to-[#3c3c3c] pt-7 min-h-screen">
      {/* <div className="flex flex-row justify-between md:w-1/2 w-[230px] mt- mb- gap-2 "> */}
        <nav className="pb-5 flex justify-between px-6 items-center">
          <IoChevronBackCircleOutline
            className="w-10 h-10 text-[#ECD9BA] hover:text-black transition"
            onClick={() => navigate("/")}
          />
          <div className="text-3xl mt- text-[#ECD9BA] ">Namkeens</div>
          <ShoppingCart
            className="w-10 h-10 text-[#238b45] hover:text-black transition"
            onClick={() => navigate("/cart")}
          />
        </nav>
      {/* </div> */}
      <hr className="border-[#ECD9BA] w-[95%] m-auto border-1" />

        
      <div className="pt-10 w-[90%] m-auto max-w-7xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {product.map((item) => (
            <NewSnack
              key={item.id}
              id={item.id} // 👈 product_id
              name={item.name}
              image={item.image_url}
              price={item.selling_price}
              user_id={user?.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
