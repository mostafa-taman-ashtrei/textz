interface props {
    text: string;
}

const GradientText: React.FC<props> = ({ text }) => {
    return (
        <p className="bg-gradient-to-r gradient-primary inline-block text-transparent bg-clip-text">
            {text}
        </p>
    );
};

export default GradientText;