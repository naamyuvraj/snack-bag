import React, { useState, useEffect } from "react";
import NewSnack from "../Newitem";
import { supabase } from "../../supabaseClient";
import LoadingPage from "../Loading";
import  useUser  from "../../useUser"; // Adjust the import path as necessary

export default function Snacks() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const  user  = useUser();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "Snacks");

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="pb-15 bg-gradient-to-r from-[#000000] to-[#3c3c3c] pt-7 min-h-screen">
      <div className="pt-10 w-[95%] m-auto max-w-7xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {products.map((item) => (
          <NewSnack
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image_url}
            price={item.selling_price}
            user_id={user?.id}
          />
        ))}
      </div>
    </div>
  );
}
