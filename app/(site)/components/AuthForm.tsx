"use client";

import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCallback, useState } from "react";

import { AuthFormVariantType } from "@/types/ui";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/general/GoogleIcon";
import { Input } from "@/components/ui/input";
import { MoreHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    username: z.string().min(5, { message: "Username must be at least 5 characters." })
        .optional()
        .or(z.literal("")),
    email: z.string().min(5, { message: "You must provide an email." })
        .email({ message: "Please enter a valid email." }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});


const AuthForm: React.FC = () => {
    const [formVariant, setFormVarient] = useState<AuthFormVariantType>("SIGN IN");

    const toggleVariant = useCallback(() => {
        if (formVariant === "SIGN IN") {
            setFormVarient("SIGN UP");
        } else {
            setFormVarient("SIGN IN");
        }
    }, [formVariant]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            username: ""
        },
    });

    const isLoading = form.formState.isSubmitting;

    const handleSubmitForm = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <>
            <Form {...form}>
                <form
                    className="w-full flex flex-col gap-2"
                    onSubmit={form.handleSubmit(handleSubmitForm)}
                >
                    {formVariant === "SIGN UP" && <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="Choose a username or we will generate one for you."
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    }

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="name@email.com"
                                        {...field}
                                    />
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
                                        placeholder="Choose a secure 8 digit password."
                                        {...field}
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        className="bg-blue-900 mt-4 justify-center w-full rounded-lg text-white py-2 hover:scale-105"
                        type="submit"
                        disabled={isLoading}
                    >
                        {
                            isLoading
                                ? <MoreHorizontal className="animate-bounce items-center w-full " />
                                : formVariant === "SIGN IN" ? "Sign In" : "Sign Up"
                        }
                    </Button>
                </form>
            </Form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-500">
                <hr className="border" />
                <p className="text-center text-sm text-gray-500">Or</p>
                <hr className="border" />

            </div>

            <Button className="bg-gray-200 dark:bg-white border py-2 w-full rounded-lg mt-5 flex justify-center items-center text-sm hover:scale-105  text-black">
                <GoogleIcon />
                {formVariant === "SIGN IN" ? "Sign In" : "Sign Up"}
                {" "} with Google
            </Button>

            <div className="mt-3 text-sm flex justify-between items-center text-gray-500">
                <p>
                    {formVariant === "SIGN IN" ? "Don&apos;t" : "Already"}
                    {" "} have an account? {" "}
                    <span
                        className="hover:underline cursor-pointer font-bold"
                        onClick={toggleVariant}
                    >
                        {formVariant === "SIGN IN" ? "Create One Now" : "Sign In Now"}
                    </span>
                </p>
            </div>
        </>
    );
};

export default AuthForm;