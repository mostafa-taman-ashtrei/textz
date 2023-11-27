import AuthForm from "@/components/landing/AuthForm";
import GradientText from "@/components/general/GradientText";
import Image from "next/image";

const AuthSection: React.FC = () => {
    return (
        <section className=" dark:bg-black  min-h-full flex items-center  justify-center">
            <div className="lg:w-1/2 px-8 lg:px-16">
                <h2 className="text-3xl font-bold text-center sm:text-5xl mb-2">
                    <GradientText text="Get Started" />
                </h2>


                <p className="text-xs text-center my-1 text-gray-500">
                    If you are already a member, easily log in if not
                    then you can sign up for a free account.
                </p>

                <AuthForm />
            </div>

            <div className="xl:block hidden w-1/2">
                <Image
                    alt="Auth Hero Image"
                    width={900}
                    height={900}
                    src="/images/auth-hero.jpg"
                />
            </div>
        </section>
    );
};

export default AuthSection;