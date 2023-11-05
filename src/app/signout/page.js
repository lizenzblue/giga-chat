import React from "react";
import { auth } from "@/firebase/config";

function Page() {
  return (
    auth.currentUser && (
      <button
        className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    )
  );
}

export default Page;
