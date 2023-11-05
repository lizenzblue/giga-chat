import { signInWithGoogle } from "@/firebase/config";

function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={signInWithGoogle}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none shadow-md"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Page;
