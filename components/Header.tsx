"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome, HiSearch } from "react-icons/hi";
import Button from "@/components/Button";

interface HeaderProps {
  className?: string;
  children: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Handle Logout
  };
  return (
    <div
      className={twMerge(
        `
        h-fit 
        bg-gradient-to-b 
        from-emerald-800 
        p-6
        `,
        className
      )}
    >
      <div className={"mb-4 flex w-full items-center justify-between"}>
        <div className={"hidden items-center gap-x-2 md:flex"}>
          <button
            onClick={() => router.back()}
            className={
              "flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
            }
          >
            <RxCaretLeft size={35} className={"text-white"} />
          </button>
          <button
            onClick={() => router.forward()}
            className={
              "flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
            }
          >
            <RxCaretRight size={35} className={"text-white"} />
          </button>
        </div>
        <div className={"flex items-center gap-x-2 md:hidden"}>
          <button
            className={
              "items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
            }
          >
            <HiHome className={"text-black "} size={20} />
          </button>
          <button
            className={
              "items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
            }
          >
            <HiSearch className={"text-black "} size={20} />
          </button>
        </div>
        <div className={"flex items-center justify-between gap-x-4"}>
          <>
            <div>
              <Button onClick={() => {}}>Sign Up</Button>
            </div>
            <div>
              <Button onClick={() => {}} className={"bg-white "}>
                Log in
              </Button>
            </div>
          </>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Header;
