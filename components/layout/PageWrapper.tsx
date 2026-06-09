import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav.";

interface PageWrapperProps {
  children: React.ReactNode;
  contained?: boolean;
  padded?: boolean;
}

export function PageWrapper({
  children,
  contained = true,
  padded = true,
}: PageWrapperProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white overflow-x-hidden md:pl-16">
      <Navbar />

      <main
        className={[
          "flex-1 w-full",
          // Desktop: offset topbar (h-14)
          "md:mt-14",
          // Mobile: offset top bar (h-12) dan BottomNav
          "mt-12 pb-20 md:pb-0",
          padded ? "px-4 py-5 md:px-8 md:py-8" : "",
        ].join(" ")}
      >
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
