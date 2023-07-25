"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome, HiSearch } from "react-icons/hi";
import Button from "@/components/Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps {
  className?: string;
  children: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();

  const { user } = useUser();
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // TODO: Reset any playing songs
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out");
    }
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
          {user ? (
            <div className={"flex items-center gap-x-4"}>
              <Button onClick={handleLogout} className={"bg-white px-6 py-2"}>
                Logout
              </Button>
              <Button
                className={"bg-white"}
                onClick={() => router.push("/account")}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  className={" px-6 py-2 text-white"}
                  onClick={authModal.onOpen}
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className={"bg-white px-6 py-2 "}
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default Header;
