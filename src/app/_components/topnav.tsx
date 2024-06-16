import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

export function TopNav() {
    return (
        <nav className="flex w-full items-center justify-between border-2 text-xl font-semibold">
            <div>Pets</div>

            <div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}