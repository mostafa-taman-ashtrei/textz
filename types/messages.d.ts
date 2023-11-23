import { Chat, Message, User } from "@prisma/client";

export type PopulatedMessageType = Message & {
    sender: User,
    seen: User[]
};

export type PopulatedChatType = Chat & {
    users: User[];
    messages: PopulatedMessageType[]
};