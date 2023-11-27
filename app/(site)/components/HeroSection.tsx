import { Blocks, MessageCircle } from "lucide-react";

import Image from "next/image";

const HeroSection: React.FC = () => {
    return (
        <section className="pt-24 bg-white dark:bg-black">
            <div className="px-12 mx-auto max-w-7xl">
                <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                    <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal md:text-6xl md:tracking-tight">
                        <span>Enjoy</span> <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r  gradient-primary lg:inline">Real Time Chat</span> <span>with anyone</span>
                    </h1>
                    <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, aut natus aspernatur obcaecati deserunt odio ipsam quo assumenda numquam rem sequi.
                    </p>

                    <div className="mb-4 space-x-0 md:space-x-2 md:mb-8 justify-center flex flex-row gap-1">
                        <a href="#auth" className="hover:scale-90 inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-sky-600 rounded-2xl sm:w-auto sm:mb-0 gap-2">
                            <MessageCircle />
                            Started Chatting
                        </a>

                        <a href="#features" className="hover:scale-90 inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-sky-600 rounded-2xl sm:w-auto sm:mb-0 gap-2">
                            <Blocks />
                            Learn More
                        </a>
                    </div>
                </div>
                <div className="w-full mx-auto mt-20 text-center md:w-10/12">
                    <div className="relative z-0 w-full mt-8">
                        <div className="relative overflow-hidden shadow-md shadow-sky-500">
                            <div className="flex items-center flex-none px-4 bg-sky-400 rounded-b-none h-11 rounded-xl">
                                <div className="flex space-x-1.5">
                                    <div className="w-3 h-3 border-2 border-white rounded-full" />
                                    <div className="w-3 h-3 border-2 border-white rounded-full" />
                                    <div className="w-3 h-3 border-2 border-white rounded-full" />
                                </div>
                            </div>

                            <Image
                                height={1500}
                                width={1500}
                                alt="hero image"
                                quality={100}
                                src="/images/hero.jpg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;