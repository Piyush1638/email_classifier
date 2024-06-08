import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { auth } from "@/auth";
import BackgroundAnimations from "@/components/BackgroundAnimations"

const Home = async () => {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">

    {/* This are for just animations */}
    <BackgroundAnimations/>
   

      <div className="my-24 flex flex-col gap-4">
        <div class="w-max">
          <h1 class="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 lg:text-5xl md:text-3xl text-2xl   text-white font-bold">
            Welcom to <span className="text-purple-500">Email Classifier</span>
          </h1>
        </div>
        <p className="text-center">Please signin to access!</p>
        {session ? (
          <div className="w-full text-center my-5">
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </main>
  );
};

export default Home;



