"use client";

import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { MoreHorizontal, Pen, UploadCloud, User2 } from "lucide-react";

import { Button } from "../ui/button";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { Input } from "../ui/input";
import { User } from "@prisma/client";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

interface props {
    user: User | null;
}

const formSchema = z.object({
    name: z.string().min(1, { message: "Name must be 1 character or more." }),
    image: z.string()
});


const UserSettings: React.FC<props> = ({ user }) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name || "",
            image: user?.image || "/images/avatar.png"
        },
    });

    const isLoading = form.formState.isLoading;
    const image = form.watch("image");


    const handleUpload = (result: any) => {
        form.setValue("image", result.info.secure_url, { shouldValidate: true });
    };

    const handleSubmitForm = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/settings", values);

            if (response.status === 200) {
                toast({
                    title: "Success (:",
                    description: "Your profile data has been upddated successfully.",
                });

                router.refresh();
            }
        } catch {
            toast({
                title: "Something went wrong!",
                description: "Try again with new data.",
                duration: 1000,
                variant: "destructive"
            });

            throw new Error("Failed to sign up user");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)}>
                <div className="flex flex-col h-full my-4">
                    <div className="flex flex-col items-stretch gap-0">
                        <h2 className="text-base font-semibold leading-7 flex flex-row gap-2">
                            <User2 />
                            Profile Settings
                        </h2>
                        <p className="text-sm leading-6 text-gray-600">
                            Change your public information so your profile can always be up to date.
                        </p>

                        <div className="mt-5 flex flex-col gap-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-black dark:text-white">
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="username ..."
                                                {...field}
                                                autoFocus={false}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <label className="block text-sm font-medium leading-6">
                                    Photo
                                </label>

                                <div className="mt-2 flex flex-row justify-start gap-x-3">
                                    <Image
                                        width="200"
                                        height="200"
                                        className="rounded-md"
                                        src={image || user?.image || "/images/placeholder.jpg"}
                                        alt="User Avatar"
                                    />

                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset="xnorx7bd"
                                        className="hover:scale-95 hover:bg-sky-600 px-1  bg-sky-700/25 rounded-md"

                                    >
                                        <UploadCloud />
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    className="w-full flex flex-row justify-center gap-1 my-4"
                    variant="secondary"
                    type="submit"
                    disabled={isLoading}
                >
                    {
                        isLoading
                            ? <MoreHorizontal className="animate-bounce" />

                            : <>
                                <Pen className="w-4 h-4" />
                                Save Changes
                            </>
                    }
                </Button>
            </form>
        </Form>
    );
};

export default UserSettings;