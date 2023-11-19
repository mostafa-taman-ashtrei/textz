import AuthForm from "./components/AuthForm";
import Image from "next/image";

const Home: React.FC = () => {
  return (
    <section className=" dark:bg-black  min-h-full flex items-center  justify-center">
      <div className="lg:w-1/2 px-8 lg:px-16">
        <div className="flex flex-row gap-1 items-center justify-center">
          <Image
            height="48"
            width="48"
            src="/images/logo.png"
            alt="Logo"
          />

          <h2 className="font-bold text-2xl text-black dark:text-white">Welcome to Textz</h2>
        </div>

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

export default Home;