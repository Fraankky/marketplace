import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ProductFormSchema = z.object({
  name: z
    .string()
    .min(3, "Username has to be between 3 and 16 character")
    .max(80, "Username has to be 80 character"),
  price: z.coerce.number().min(10000, "Price cannot be under Rp 10.000"),
  stock: z.coerce.number().min(1, "Stock cannot be under 8"),
  imageUrl: z.string().url("use a valid URL"),
});

export const ProductForm = (props) => {
  const {
    onSubmit,
    cardTitle,
    defaultName,
    defaultPrice,
    defaultStock,
    defaultImageUrl,
  } = props;

  const form = useForm({
    defaultValues: {
      name: defaultName || "",
      price: defaultPrice || 0,
      stock: defaultStock || 0,
      imageUrl: defaultImageUrl || "",
    },
    resolver: zodResolver(ProductFormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[540px] w-full"
      >
        <Card className="!bg-white !text-black">
          <CardHeader>
            <CardTitle className="font-bold">{cardTitle} </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Product name has to be beetwen 3 and 80 character
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Product name has to be beetwen 3 and 80 character
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stok</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Product name has to be beetwen 3 and 80 character
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product image</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Please use valid URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full !bg-black !text-white">
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
