import React from "react";
import NewSnack from "../Newitem";
import { supabase } from '../../supabaseClient';
import { useState, useEffect } from "react";
import LoadingPage from "../Loading";


export default function Drinks() {

  const [product,setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async()=> {
      setLoading(true)
      const {data,error} = await supabase
                  .from('products')
                  .select('*')
                  .eq('category','Drinks')
                  
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
    return <LoadingPage/>
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
