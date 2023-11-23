"use client";

import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { SendHorizonal, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    messageText: z.string().optional()
});


const ChatInput: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            messageText: ""
        },
    });

    const handleSubmitForm = () => { };

    return (
        <div className="py-4 px-4 border-t flex items-center gap-2 lg:gap-4 w-full">
            <UploadCloud />

            <Form {...form}>
                <form
                    className="flex items-center gap-2 lg:gap-4 w-full"
                    onSubmit={form.handleSubmit(handleSubmitForm)}
                >
                    <FormField
                        control={form.control}
                        name="messageText"
                        render={({ field }) => (
                            <FormItem className="w-full">

                                <FormControl>
                                    <Input
                                        placeholder="Say something to break the ice 🧊"
                                        {...field}
                                    />

                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        )}
                    />



                    <Button variant="secondary">
                        <SendHorizonal />
                    </Button>
                </form>
            </Form>

        </div>
    );
};

export default ChatInput;