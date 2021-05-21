import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import {
  SearchIcon,
  MenuIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
const Header = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  return (
    <header>
      {/* top nav */}
      <div className="p-1 flex-grow py-2 flex items-center bg-amazon_blue">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        {/* custom search bar */}
        <div className="hidden md:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input className="focus:outline-none p-2 h-full w-6 flex-grow flex-shrink rounded-l-md" />
          <SearchIcon className="h-12 p-4 text-white" />
        </div>
        {/* right section */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className=" link">
            <p onClick={!session ? signIn : signOut}>
              {session ? `${session.user.name} [X]` : "Sign In"}
            </p>
            <p
              onClick={!session ? signIn : signOut}
              className="font-extrabold md:text-sm"
            >
              {!session ? `no Account info` : "Account & lists"}
            </p>
          </div>
          <div className=" link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className=" link relative flex items-center"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              0
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="mt-2 hidden md:inline font-extrabold md:text-sm ">
              basket
            </p>
          </div>
        </div>
      </div>
      {/* bottom nav */}
      <div className="flex items-center space-x-2 p-2 text-sm text-white bg-amazon_blue-light">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" /> ALL
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Todays Deals</p>

        <p className="link hidden md:inline-flex">Electronics</p>
        <p className="link hidden md:inline-flex">Food & Grocery</p>
        <p className="link hidden md:inline-flex">Prime</p>
        <p className="link hidden md:inline-flex">Shopper Toolkit</p>
        <p className="link hidden md:inline-flex">Health & Personal</p>
      </div>
    </header>
  );
};

export default Header;
