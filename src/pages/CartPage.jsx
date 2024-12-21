import { SignedInPage } from "@/components/guard/SignedInPage";
import { CartItem } from "@/components/ui/CartItem";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cartSelector = useSelector((state) => state.cart);

  return (
    <SignedInPage>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Cart</h1>
        <div className="mt-10">
          <Separator />

          <div className="grid grid-cols-12 gap-8 my-8">
            <div className="col-span-7 gap-6 flex flex-col">
              {cartSelector.items.map((cartItem) => {
                return (
                  <CartItem
                    name={cartItem.product.name}
                    price={cartItem.product.price}
                    image={cartItem.product.imageUrl}
                    quantity={cartItem.quantity}
                    stock={cartItem.product.stock}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </SignedInPage>
  );
};

export default CartPage;
