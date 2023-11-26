"use client";

import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MoreHorizontal, SendHorizonal, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import { Input } from "@/components/ui/input";
import axios from "axios";
import useChat from "@/hooks/useChat";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    messageText: z.string().min(1, "Write something to send a message.")
});


const ChatInput: React.FC = () => {
    const { chatId } = useChat();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            messageText: ""
        },
    });

    const isLoading = form.formState.isLoading;

    const handleSubmitForm = async (values: z.infer<typeof formSchema>) => {
        try {
            form.reset();
            await axios.post("/api/messages", { message: values.messageText, chatId });
        } catch {
            throw new Error("Failed to send message");
        }
    };


    const handleUpload = async (result: any) => {
        try {
            await axios.post("/api/messages", { image: result.info.secure_url, chatId });
        } catch {
            throw new Error("Failed to send message");
        }
    };

    return (
        <div className="py-4 px-4 border-t flex items-center gap-2 lg:gap-4 w-full">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="xnorx7bd"
            >
                <UploadCloud />
            </CldUploadButton>

            <Form {...form}>
                <form
                    className="flex items-center gap-2 lg:gap-4 w-full"
                    onSubmit={form.handleSubmit(handleSubmitForm)}
                >
                    <FormField
                        control={form.control}
                        name="messageText"
                        disabled={isLoading}
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
                        {
                            isLoading
                                ? <MoreHorizontal className="animate-bounce" />
                                : <SendHorizonal />
                        }
                    </Button>
                </form>
            </Form>

        </div>
    );
};

export default ChatInput;