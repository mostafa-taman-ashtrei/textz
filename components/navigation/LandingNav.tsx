import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import ThemeTogglerButton from "./ThemeTogglerButton";

const LandingNav: React.FC = () => {
    return (
        <header>
            <nav className="bg-white  border-b px-4 lg:px-6 py-2.5 dark:bg-black">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link href="/" className="flex items-center gap-1">

                        <Image
                            alt="logo"
                            width={30}
                            height={30}
                            src="/images/logo.png"
                            quality={100}
                        />

                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Textz
                        </span>
                    </Link>


                    <div className="flex flex-row gap-2 justify-center items-center">
                        <a href="#auth">
                            <Button variant="outline" size="icon" className="rounded-full">
                                <MessageCircle />
                            </Button>
                        </a>

                        <ThemeTogglerButton />
                    </div>
                </div>

            </nav>
        </header>
    );
};

export default LandingNav;