import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/auth";

const LoginButton = () => {
  return (
    <form action={async()=>{
      "use server"
      await signIn('google', {redirectTo: "/home"})
    }} className="w-full flex my-10">
      <button type="submit" name="action" value="google" className="flex items-center gap-3 font-bold bg-white text-black py-3 rounded-md px-3 mx-auto">
        <FcGoogle className="h-full text-3xl" />{" "}
        <span className="">Sign in with Google</span>
      </button>
    </form>
  );
};

export default LoginButton;
