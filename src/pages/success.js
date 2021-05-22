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
        <button onClick={() => router.push("/orders")} className="button">
          goto your orders
        </button>
        <button onClick={() => router.push("/")} className="button">
          continue shopping ...
        </button>
      </main>
    </div>
  );
};

export default Success;
