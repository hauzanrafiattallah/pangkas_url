import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 mx-auto">
      <Link className="text-xl md:text-2xl font-bold" href="/">
        Pangkas URL
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <SignedOut>
          <Button asChild>
            <Link href="auth/sign-in">Sign In</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton fallback={<Loader2 className="animate-spin" />} />
        </SignedIn>
      </div>
    </header>
  );
};
