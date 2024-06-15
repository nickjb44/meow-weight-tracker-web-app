import Link from "next/link";

export default async function Home() {
  return (
      <main
          className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <header className="header text-center py-10">
          <h1 className="text-5xl font-extrabold">Welcome to Meow Weight Tracker</h1>
          <h2 className="text-2xl">A platform for tracking cat weight and calorie intake</h2>
        </header>
        <div className="content text-center py-10">
          <Link href="/signup">
            <button className="w-48 p-4 mb-4 bg-green-500 hover:bg-green-700 text-white rounded">Create New Account
            </button>
          </Link>
          <Link href="/login">
            <button className="w-48 p-3 bg-blue-500 hover:bg-blue-700 text-white rounded">Login</button>
          </Link>
        </div>
        <footer className="footer text-center py-10 bg-blue-700 text-white">
          <p>© 2024 Meow Weight Tracker. All rights reserved</p>
        </footer>
      </main>
  );
}