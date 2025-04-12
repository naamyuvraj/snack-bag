import React from "react";
import NewSnack from "../Newitem";
import { supabase } from '../../supabaseClient';
import { useState,useEffect } from "react";
import LoadingPage from "../Loading";

export default function Biscuits() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products') 
        .select('*')
        .eq('category','Biscuits');

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
    return <LoadingPage/>
  }

  return (
    <>
        <div className="pb-15 bg-gradient-to-r from-[#000000] to-[#3c3c3c] pt-7 h-screen">
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
