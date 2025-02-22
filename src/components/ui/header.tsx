import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 mx-auto">
      <Link className="text-xl md:text-2xl font-bold" href="/">
        Pangkas URL
      </Link>
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
};
