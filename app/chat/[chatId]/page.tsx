interface props {
    params: { chatId: string; }
}

const ChatIdPage: React.FC<props> = ({ params }) => {
    return (
        <div>This is {params.chatId} chat</div>
    );
};

export default ChatIdPage;