import React from "react";
import NewSnack from "../Newitem";
import { supabase } from '../../supabaseClient';
import { useState, useEffect } from "react";


export default function Noodles() {

  const [product,setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async()=> {
      setLoading(true)
      const {data,error} = await supabase
                  .from('products')
                  .select('*')
                  .eq('category','Noodles')
                  
                  ;
        if (error){
          console.error('Data nahi aya',error)
        }
        else {
          setProduct(data)
        }
        setLoading(false)
      } ;
    fetchData()
  },[])

  // loading pge ka styling
  if (loading){
    return <h1>Loading Data...</h1>
  }


  return (
    <>
      <div className="pb-10 h-screen bg-[#F3CA52] pt-7">
        <div className="pt-10 w-[95%] m-auto max-w-7xl">
          {
            product.map((item,index)=>(
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
