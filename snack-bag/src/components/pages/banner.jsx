import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import useUser from "../../useUser";
import BannerCard from "../BannerCards";

export default function Banner() {
  const [products, setProducts] = useState([]);
  const user = useUser();

  useEffect(() => {
    const fetchProducts = async () => {
        const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("popular", true)
        .gt("quantity", 0)
        .order("quantity", { ascending: false }); // 👈 sort by highest quantity
            if (error) {
        console.error("Error fetching popular products:", error);
      } else {
        console.log("Popular & available products:", data);
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full px-4 py-3">
        <h2 className="text-2xl text-[#ECD9BA] mb-7 mx-5">Popular Items</h2>
      <div className="overflow-x-auto hide-scroll-bar">
        <div className="flex gap-4">
          {products.map((item) => (
            <div key={item.id} className="min-w-[180px]">
              <BannerCard
                id={item.id}
                name={item.name}
                image={item.image_url}
                price={item.selling_price}
                user_id={user?.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
