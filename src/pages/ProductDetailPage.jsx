import { Button } from "@/components/ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailPage = () => {
  // 1. dapetin id
  // 2. fetch product yang memiliki id tersebut
  // 3. masukin data product
  // 4. tampilin data dari state ke ui
  const params = useParams();
  const [quantity] = useState(0);

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    imageUrl: "",
    id: 0,
  });

  const [productIsLoading, setProductIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setProductIsLoading(true);
      const response = await axiosInstance.get("/products/" + params.productId);

      setProduct(response.data);
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      setProductIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
      <div className="grid grid-cols-2 gap-8">
        {productIsLoading ? (
          <Skeleton className="w-full h-[582px]" />
        ) : (
          <img src={product.imageUrl} alt={product.name} className="w-full" />
        )}

        <div className="flex flex-col gap-1 justify-center">
          {productIsLoading ? (
            <Skeleton className="w-[250px] h-[32px]" />
          ) : (
            <h1 className="text-xl">{product.name}</h1>
          )}
          {productIsLoading ? (
            <Skeleton className="w-[300px] h-[38px]" />
          ) : (
            <h3 className="text-3xl font-bold">
              Rp {product.price.toLocaleString("id-ID")}
            </h3>
          )}
          {productIsLoading ? (
            <Skeleton className="w-[350px] h-[120px]" />
          ) : (
            <p className="text-sm text-muted-foreground mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
              quasi cum atque minima. Quisquam quam quis expedita a inventore
              velit labore consequuntur quo magnam doloribus, dolor voluptas
              fugit.
            </p>
          )}

          <div className="flex items-center gap-6 mt-6">
            <Button variant="ghost" size="icon">
              <IoIosRemove className="h-6 w-6" />
            </Button>
            <p className="text-lg font-bold">{quantity}</p>

            <Button
              variant="ghost"
              size="icon"
              className=" bg-white text-black p-3 rounded-md hover:bg-gray-100"
            >
              <IoIosAdd className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex items-center mt-2 gap-4">
            <Button className="w-full !text-white" size="lg">
              Add To Cart
            </Button>
            <Button size="icon" variant="ghost">
              <IoHeartOutline className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
