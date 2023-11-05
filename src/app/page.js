"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebaseApp, provider } from "@/firebase/config";
import ChatRoom from "./ChatRoom/page";
import SignIn from "./signin/page";
import SignOut from "./signout/page";

export default function Home() {
  const [user] = useAuthState(auth);
  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-500 text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">My Chat App</h1>
        <SignOut />
      </header>
      {user ? <ChatRoom /> : <SignIn />}
    </div>
  );
}
