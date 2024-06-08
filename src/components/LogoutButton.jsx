import React from "react";
import { signOut } from "@/auth";
import {doLogOut} from "@/app/actions/index"

const LogoutButton = () => {
  return (
    <form action={doLogOut}>
      <button type="submit" className="px-4 py-2 rounded-md border border-slate-400 hover:border-none hover:bg-red-700 hover:text-white transform ease-in-out duration-1000">
        SignOut
      </button>
    </form>
  );
};

export default LogoutButton;
