import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="bg-background/60 text-foreground h-16 sticky top-0">
      <div className="flex items-center justify-between p-4 ">
        <h1 className="text-3xl font-bold">
          <a href="/">Crypton</a>
        </h1>
        <ModeToggle />
      </div>

      <div className="h-0.5 w-full bg-muted" />
    </nav>
  );
};

export default Navbar;
