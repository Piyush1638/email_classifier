import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import LogoutButton from "@/components/LogoutButton";
import GetAllMails from "@/components/GetAllMails";
import Link from "next/link";

const page = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");
  return (
    <main className="min-h-screen p-10 xl:py-24 flex flex-col gap-10 bg-black">
      <h1 className="lg:text-3xl md:text-2xl text-lg font-bold text-center font-Gwendolyn">
        Welcome <span className="text-purple-500">{session?.user?.name}</span>{" "}
        To <span className="text-purple-500">Email Classifier! </span>
      </h1>
      <div className="flex md:flex-row flex-col items-center justify-between gap-10 md:gap-0">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={session?.user?.image}
            alt={session?.user?.name}
            height={50}
            width={50}
            priority
            className="rounded-full"
          />
          <p className="text-xs">{session?.user?.email}</p>
        </div>
        <div className="flex items-center justify-center gap-4">
        <Link href="https://aistudio.google.com/app/apikey" target="blank" className="underline text-xs md:text-sm">How Do I get Gemini API key?</Link>
        <LogoutButton />
        </div>
      </div>

      <GetAllMails accessToken={session.accessToken} />
    </main>
  );
};

export default page;
