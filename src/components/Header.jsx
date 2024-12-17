import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoCart, IoHeart } from "react-icons/io5";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user);

  const handleLogout = () => {
    // 1. remove local storage
    localStorage.removeItem("current-user");
    // 2. reset user slice
    dispatch({
      type: "USER_LOGOUT",
    });
  };

  return (
    <header className="h-20 flex items-center border-b justify-between px-8">
      {/* BRAND */}
      <Link to="/">
        <p className="text-4xl font-bold hover:cursor-pointer"> Agrotrusted.</p>
      </Link>

      {/* MENU */}
      <Input
        className="max-w-[600px] max-h-10"
        placeholder="Search Products.."
      />

      <div className="flex space-x-4 h-5 items-center">
        <div className="flex space-x-2">
          <>
            <Link to="/cart">
              <Button size="icon" variant="ghost">
                <IoCart className="h-8 w-8" />
              </Button>
            </Link>
          </>

          <Button size="icon" variant="ghost">
            <IoHeart className="h-8 w-8" />
          </Button>
        </div>
        <Separator orientation="vertical" className="h-full" />

        <div className="flex space-x-2 items-center">
          {userSelector.id ? (
            <>
              <p>
                Hello, {userSelector.username} ({userSelector.role})
              </p>
              <Button onClick={handleLogout} variant="destructive">
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  className="!text-neutral-50 text-sm !bg-neutral-900 "
                  variant="outline"
                >
                  Log in
                </Button>
              </Link>

              <Link to="/register">
                <Button
                  className="!bg-neutral-900 !text-neutral-50 text-sm"
                  variant="outline"
                >
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
