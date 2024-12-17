import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormField,
  FormControl,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/lib/axios";
import { useDispatch } from "react-redux";
import { GuestPage } from "@/components/guard/GuestPage";

//schema login form validasi use zod
const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username has to be between 3 and 16 character")
    .max(16, "Username has to be between 3 and 16 character"),
  password: z.string().min(8, "Your password needs to be 8 characters or more"),
});

//komponen login
const LoginPage = () => {
  const dispatch = useDispatch();

  const form = useForm({
    // ngeset nilai default
    defaultValues: {
      username: "",
      password: "",
    },
    //Menghubungkan zod dengan react-hook-form untuk menjalankan validasi berdasarkan loginFormSchema.
    //reValidateMode: Mengatur agar validasi ulang dilakukan saat formulir disubmit.
    resolver: zodResolver(loginFormSchema),
    reValidateMode: "onSubmit",
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = async (values) => {
    try {
      const userResponse = await axiosInstance.get("/users", {
        params: {
          username: values.username,
        },
      });

      if (
        !userResponse.data.length ||
        userResponse.data[0].password !== values.password
      ) {
        alert("Invalid credentials");
        return;
      }

      alert("Succesfully logged in as " + userResponse.data[0].username);

      dispatch({
        type: "USER_LOGIN",
        payload: {
          username: userResponse.data[0].username,
          id: userResponse.data[0].id,
          role: userResponse.data[0].role,
        },
      });

      localStorage.setItem("current-user", userResponse.data[0].id);

      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GuestPage>
      <main className=" px-4 container py-8 flex flex-col justify-center items-center max-w-xcreen-md h-[80vh]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="w-full max-w-[540px]"
          >
            <Card>
              <CardHeader className="bg-white text-neutral-900">
                <CardTitle>Welcome back!</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 bg-white text-neutral-900">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type={isChecked ? "text" : "password"}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center space-x-2">
                  <Checkbox
                    onCheckedChange={(checked) => setIsChecked(checked)}
                    id="show-password"
                  />
                  <Label htmlFor="show-password">Show Password</Label>
                </div>
              </CardContent>
              <CardFooter className=" bg-white">
                <div className="flex flex-col space-y-2 w-full ">
                  <Button type="submit" className="!text-white !bg-neutral-900">
                    Login
                  </Button>
                  <Button variant="link" className=" w-full !text-neutral-900">
                    Sign up instead
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </GuestPage>
  );
};
export default LoginPage;
