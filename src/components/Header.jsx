import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoCart, IoHeart } from "react-icons/io5";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const userSelector = useSelector((state) => state.user);
  const counterSelector = useSelector((state) => state.counter);

  return (
    <header className="h-20 flex items-center border-b justify-between px-8">
      {/* BRAND */}
      <p className="text-5xl font-bold hover:cursor-pointer"> Agrotrusted.</p>

      {/* MENU */}
      <Input
        className="max-w-[600px] max-h-10"
        placeholder="Search Products.."
      />

      <div className="flex space-x-4 h-5 items-center">
        <div className="flex space-x-2">
          <Link to="/cart">
            <Button size="icon" variant="ghost">
              <IoCart className="h-8 w-8" />
            </Button>
          </Link>
          <Button size="icon" variant="ghost">
            <IoHeart className="h-8 w-8" />
          </Button>
        </div>
        <Separator orientation="vertical" className="h-full" />

        <div className="flex space-x-2">
          <Button className="!text-neutral-50 text-sm " variant="outline">
            Log in
          </Button>
          <Button className="!bg-black !text-neutral-50 text-sm">
            Sign up
          </Button>
          <p>Hello, {userSelector.username} </p>
          <p>Counter: {counterSelector.count} </p>
        </div>
      </div>
    </header>
  );
};
