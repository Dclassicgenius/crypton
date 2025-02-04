import { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </main>
  );
};

export default Content;
