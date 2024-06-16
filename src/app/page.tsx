import Link from "next/link";
import {SignedIn, SignedOut, SignInButton, SignUp, SignUpButton, UserButton} from "@clerk/nextjs";
import {TopNav} from "~/app/_components/topnav";

export default async function Home() {
  return (
      <div>
          <TopNav />
          <main
              className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <header className="header text-center py-10">
              <h1 className="text-5xl font-extrabold">Welcome to Meow Weight Tracker</h1>
              <h2 className="text-2xl">A platform for tracking cat weight and calorie intake</h2>
            </header>
            <div className="content text-center py-10">
                <SignedOut>
                    <StyledSignInButton />
                    <StyledSignUpButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
            <footer className="footer text-center py-10 bg-blue-700 text-white">
              <p>© 2024 Meow Weight Tracker. All rights reserved</p>
            </footer>
          </main>
      </div>
  );
}
const StyledSignInButton = () => (
    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <SignInButton />
    </div>
);

const StyledSignUpButton = () => (
    <div className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        <SignUpButton />
    </div>
);
