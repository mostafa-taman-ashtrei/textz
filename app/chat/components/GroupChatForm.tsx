"use client";

import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MoreHorizontal, UserPlus2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "./UserSelect";
import { User } from "@prisma/client";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

interface props {
    userList: User[];
}

const formSchema = z.object({
    name: z.string().min(1, { message: "Group name must be at least 1 characters." }),
    members: z.array(z.object({
        value: z.string(),
        label: z.string()
    })).min(2, { message: "Select At least 2 members or more" })
});

const GroupChatForm: React.FC<props> = ({ userList }) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            members: []
        },
    });

    const isLoading = form.formState.isLoading;

    const handleSubmitForm = async (values: z.infer<typeof formSchema>) => {
        try {
            const data = { isGroup: true, members: values.members, name: values.name };

            const response = await axios.post("/api/chat", data);
            if (response.status === 200) {
                toast({
                    title: `${values.name} created`,
                    description: `${values.name} group was created successfully`,
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
        } finally {
            form.reset();
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)} className="w-96">
                <div className="pb-4">
                    <h2 className="text-center font-semibold leading-7 mb-2">
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <Users />
                            <span>Create A Group Chat</span>
                        </div>

                    </h2>

                    <div className=" flex flex-col gap-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Group Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Group Name ..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="members"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Group Members</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        options={userList.map((user) => ({ value: user.id, label: user.name }))}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Button
                    variant="secondary"
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {
                        isLoading
                            ? <MoreHorizontal className="animate-bounce" />
                            : <div className="flex flex-row items-center gap-2">
                                <UserPlus2 />
                                Create Group
                            </div>
                    }
                </Button>
            </form>
        </Form>
    );
};

export default GroupChatForm;