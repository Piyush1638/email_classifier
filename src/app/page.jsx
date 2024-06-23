import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { auth } from "@/auth";
import BackgroundAnimations from "@/components/BackgroundAnimations";
import Link from "next/link";

const Home = async () => {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      {/* This are for just animations */}
      <div className="z-10">
      <BackgroundAnimations />
      </div>

      <div className="my-24 flex flex-col gap-4 z-[20]">
        <div className="w-max">
          <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 lg:text-5xl md:text-3xl text-2xl   text-white font-bold">
            Welcom to <span className="text-purple-500">Email Classifier</span>
          </h1>
        </div>

        {session ? (
          <div className="w-full text-center my-5">
            <Link href="/home">Go Home</Link>
            <LogoutButton />
          </div>
        ) : (
          <>
            <p className="text-white text-center">
              Please Signin to access!
            </p>
            <LoginButton />
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
