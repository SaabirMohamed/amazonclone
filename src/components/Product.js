import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
const Product = ({ id, title, price, description, category, image }) => {
  const MAX_RATING = 5;
  const MIN_RATING = 1;
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3 ">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500 " />
          ))}
      </div>
      {/* line-clamp-2 not working on vercel*/}
      <p className="text-xs my-2 ">{description.slice(0, 100)}...</p>
      <div>
        <Currency className="mb-3 " quantity={price} currency="ZAR" />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-15 ">
          <img
            className="w-12"
            src="https://links.papareact.com/fdw"
            alt="Prime Delivery Logo"
          />
          <p className="text-gray-500 text-xs">Free next day delivery</p>
        </div>
      )}
      <button className="mt-auto button">Add to basket</button>
    </div>
  );
};

export default Product;
