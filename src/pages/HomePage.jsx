import { ProductCard } from "../components/ProductCard";
import { axiosInstance } from "@/lib/axios";
import { useState, useEffect } from "react";

// const productsRaw = [
//   {
//     name: "Robusta Temanggung",
//     price: 7.0,
//     stock: "2",
//     imageUrl:
//       "https://agrotrusted.com/wp-content/uploads/2024/07/aaaaaa-removebg-preview.png",
//   },
//   {
//     name: "Arabica Mandheling G3",
//     price: 6.7,
//     stock: "3",
//     imageUrl:
//       "https://agrotrusted.com/wp-content/uploads/2024/07/6-removebg-preview-1.png",
//   },
//   {
//     name: "Arabica Toraja G2",
//     price: 4.5,
//     stock: "5",
//     imageUrl:
//       "https://agrotrusted.com/wp-content/uploads/2024/07/Toraja-G1.png",
//   },
// ];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [productIsLoading, setProductIsLoading] = useState(false);

  const productsList = products.map((product, index) => {
    return (
      <ProductCard
        //this data is taken from db.json
        id={product.id}
        key={index}
        imageUrl={product.imageUrl}
        name={product.name}
        stock={product.stock}
        price={product.price}
      />
    );
  });

  // data fetching
  const fetchProducts = async () => {
    setProductIsLoading(true);
    try {
      const response = await axiosInstance.get("/products");

      setProducts(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setProductIsLoading(false);
    }
  };
  // Fetch product data once, when homepage is first mounted
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <main className="mi n-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">
        <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Purchase product from trusted product!
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            We are your food supply solution
          </p>
        </div>
        {productIsLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">{productsList}</div>
        )}
      </main>
    </>
  );
};
export default HomePage;
