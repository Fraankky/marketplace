import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Button } from "./button";
import { IoCheckmark, IoClose } from "react-icons/io5";

export const CartItem = (props) => {
  return (
    <div className="flex gap-6">
      <div className="aspect-square w-full overflow-hidden rounded-md max-w-52">
        <img src={props.imageUrl} alt={props.name} className="w-full " />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col gap-1">
          <p className="text-sm">{props.name}</p>
          <p className="font-bold text-lg ">
            Rp {props.price.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <IoIosRemove className="w-4 h-4" />
          </Button>
          <p className="text-lg font-bold"> {props.quantity}</p>
          <Button variant="ghost" size="icon">
            <IoIosAdd className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center">
            {props.stock < props.quantity ? (
              <>
                <IoClose className="text-red-500 h-6 w-6" />
                <span className="text-sm text-muted-foreground mr-10">
                  Not Available
                </span>
              </>
            ) : (
              <>
                <IoCheckmark className="text-green-500 h-6 w-6" />
                <span className="text-sm text-muted-foreground mr-10">
                  Available
                </span>
              </>
            )}

            <Button className="text-destructive text-red-600" variant="link">
              Remove Item
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
