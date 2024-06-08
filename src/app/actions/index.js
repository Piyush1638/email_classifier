"use server"
import { signIn, signOut } from "@/auth";
export const doSocialLogin = async(formdata)=>{
    const action = formdata.get('action');
    await signIn(action, {redirectTo: "/home"});
    console.log(action);
}

export const doLogOut = async()=>{
    await signOut({redirectTo: "/"});
}

