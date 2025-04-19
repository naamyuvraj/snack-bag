import React from "react";
import NewSnack from "../Newitem";
import { supabase } from "../../supabaseClient";
import { useState, useEffect } from "react";
import LoadingPage from "../Loading";
import  useUser  from "../../useUser"; // Adjust the import path as necessary
export default function Namkeens() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const  user  = useUser();

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
      <div className="pb-15 bg-gradient-to-r from-[#000000] to-[#3c3c3c] pt-7 h-screen">
      <div className="pt-10 w-[95%] m-auto max-w-7xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-y-8 justify-items-center">
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
