import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import useUser from "../../useUser";
import BannerCard from "../BannerCards";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Banner() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const user = useUser();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("popular", true)
        .gt("quantity", 0)
        .order("quantity", { ascending: false });

      if (error) {
        console.error("Error fetching popular products:", error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === products.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? products.length - 1 : prevIndex - 1;
    });
  };

  return (
    <div className="w-full px-4 py-3">
      <h2 className="text-2xl text-[#ECD9BA] mb-7 mx-5">Popular Items</h2>
      <div className="relative">
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700"
        >
          <FaChevronLeft />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * 200}px)`,
            }}
          >
            {[...products, ...products].map((item) => (
              <div key={item.id} className="min-w-[180px] mx-2">
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

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
