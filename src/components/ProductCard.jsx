import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { useSelector } from "react-redux";

export const ProductCard = (props) => {
  const { id, imageUrl, name, price, stock } = props;

  const [quantity, setQuantity] = useState(0);

  const userSelector = useSelector((state) => state.user);

  const addToCart = async () => {
    try {
      if (!userSelector.id) {
        alert("Please login first");
        return;
      }

      await axiosInstance.post("/carts", {
        id: id,
        userId: userSelector.user,
        productId: id,
        quantity,
      });

      alert("Item added to carts");
    } catch (err) {
      console.log(err);
    }
  };

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };
  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // // MOUNT
  // useEffect(() => {
  //   alert("Component Did Mount");
  // }, []);

  // // Update Mount
  // useEffect(() => {
  //   alert("Component Did Update");
  // }, [quantity]);

  // //Unmount
  // useEffect(() => {
  //   return () => {
  //     alert("COMPONENT UNMOUNT");
  //   };
  // }, []);

  return (
    <div className="p-4 border rounded-xl sm:max-w-96 flex flex-col gap-5">
      <Link
        to={"/product/" + id}
        className="aspect-square w-full overflow-hidden"
      >
        <img
          className="w-full size-full md:size-auto"
          src={imageUrl}
          alt="product"
        />
      </Link>

      <Link to={"/product/" + id}>
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-xl font-bold"> ${price} </p>
        <p className="text-muted-foreground">In stock: {stock} </p>
      </Link>
      <div className="flex flex-col gap-2">
        {/* button quantity */}
        <div className="flex justify-between items-center">
          <Button
            disabled={quantity <= 0}
            onClick={decrementQuantity}
            variant="ghost"
            size="icon"
          >
            <IoIosRemove className="h-6 w-6" />
          </Button>
          <p className="text-lg font-bold">{quantity}</p>
          <Button
            disabled={quantity >= stock}
            onClick={incrementQuantity}
            variant="ghost"
            className=" bg-white text-black p-3 rounded-md hover:bg-gray-300"
          >
            <IoIosAdd className="h-6 w-6" />
          </Button>
        </div>

        {/* Button add to chart */}

        <Button
          disabled={quantity >= stock || quantity == 0}
          onClick={addToCart}
          className="w-full"
        >
          {stock > 0 ? "Add to cart" : "Out of stock"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
