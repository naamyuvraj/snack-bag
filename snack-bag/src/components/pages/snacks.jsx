import React from "react";
import NewSnack from "../Newitem";
import { supabase } from "../../supabaseClient";
import { useState, useEffect } from "react";
import LoadingPage from "../Loading";

export default function Snacks() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <>
      <div className="pb-15 bg-gradient-to-r from-[#000000] to-[#3c3c3c] pt-7 min-h-screen">
        <div className="pt-10 w-[95%] m-auto max-w-7xl flex flex-wrap gap-4 justify-center">
          {products.map((item) => (
            <NewSnack
              key={item.id}
              id={item.id} // 👈 product_id
              name={item.name}
              image={item.image_url}
              price={item.selling_price}
              user_id="aae8c61c-1ce4-4a1e-95b1-f2b80d665c51" // 👈 replace with your actual/fake user_id
            />
          ))}
        </div>
      </div>
    </>
  );
  }
