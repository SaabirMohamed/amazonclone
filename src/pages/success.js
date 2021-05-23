import Header from "../components/Header";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-300 h-screen">
      <Header />

      <main className="mt-5 flex flex-col max-w-screen-lg mx-auto items-center">
        <div className="flex items-center">
          <CheckCircleIcon className="h-10 text-green-500" />
          <h1 className="pl-3">Successfully placed your order</h1>
        </div>
        <p>Thanks for shopping with us</p>
        <div className="flex mt-3 space-x-7 align-middle justify-around content-between">
          <button onClick={() => router.push("/orders")} className="button p-5">
            review your orders
          </button>
          <button onClick={() => router.push("/")} className="button p-5 ">
            back to shopping ...
          </button>
        </div>
      </main>
    </div>
  );
};

export default Success;
