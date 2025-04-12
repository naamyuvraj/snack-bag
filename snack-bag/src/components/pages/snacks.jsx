import React from "react";
import NewSnack from "../Newitem";
import { supabase } from '../../supabaseClient';
import { useState,useEffect } from "react";

export default function Snacks() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products') 
        .select('*')
        .eq('category','Snacks');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading){
    return <h1>Loading Data....</h1>
  }

  return (
    <>
      <div className="pb-10 h-screen bg-[#F3CA52] pt-7">
      <div className="pt-10 w-[95%] m-auto max-w-7xl">

        {
          products.map((item,index) => (
            <NewSnack key={index}
            name={item.name}
            image={item.image_url}
            price={item.selling_price}
          />
          ))
        }
        </div>
      </div>
    </>
  );
}
