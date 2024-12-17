import { SignedInPage } from "@/components/guard/SignedInPage";
import { CartItem } from "@/components/ui/CartItem";
import { Separator } from "@/components/ui/separator";

const CartPage = () => {
  return (
    <SignedInPage>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Cart</h1>
        <div className="mt-10">
          <Separator />

          <div className="grid grid-cols-12 gap-8 my-8">
            <div className="col-span-7 gap-6 flex flex-col">
              <CartItem
                name="Robusta Temanggung"
                price={700000}
                imageUrl="https://agrotrusted.com/wp-content/uploads/2024/07/aaaaaa-removebg-preview.png"
              />
            </div>
          </div>
        </div>
      </main>
    </SignedInPage>
  );
};

export default CartPage;
