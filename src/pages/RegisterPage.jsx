import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormField,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/lib/axios";

//schema login form validasi use zod
const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username has to be between 3 and 16 character")
      .max(16, "Username has to be between 3 and 16 character"),
    password: z
      .string()
      .min(8, "Your password needs to be 8 characters or more"),
    repeatPassword: z
      .string()
      .min(8, "Your password needs to be 8 characters or more"),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password do not match",
        path: ["repeatPassword"],
      });
    }
  });

//komponen login
const RegisterPage = () => {
  const form = useForm({
    // ngeset nilai default
    defaultValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
    //Menghubungkan zod dengan react-hook-form untuk menjalankan validasi berdasarkan loginFormSchema.
    //reValidateMode: Mengatur agar validasi ulang dilakukan saat formulir disubmit.
    resolver: zodResolver(registerFormSchema),
    reValidateMode: "onSubmit",
  });

  //fungsi untuk handle login ketika login dijalankan
  const handleRegister = async (values) => {
    try {
      const userResponse = await axiosInstance.get("/users", {
        params: {
          username: values.username,
        },
      });
      if (userResponse.data.length) {
        alert("Username already taken");
        return;
      }
      await axiosInstance.post("/users", {
        username: values.username,
        password: values.password,
      });

      alert("User registered");
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className=" px-4 container py-8 flex flex-col justify-center items-center max-w-xcreen-md h-[80vh]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="w-full max-w-[540px]"
        >
          <Card>
            <CardHeader className="bg-white text-neutral-900">
              <CardTitle>Create an Account</CardTitle>
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
                    <FormDescription className="!text-neutral-600">
                      Username has to be between 3 and 16 character
                    </FormDescription>
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
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription className="!text-neutral-600">
                      Password has to be 8 character or more
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription className="!text-neutral-600">
                      Make sure your password match
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className=" bg-white">
              <div className="flex flex-col space-y-2 w-full ">
                <Button type="submit" className="!text-white !bg-neutral-900">
                  Register
                </Button>
                <Button variant="link" className=" w-full !text-neutral-900">
                  Log In instead
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};
export default RegisterPage;
