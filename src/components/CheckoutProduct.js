import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
const CheckoutProduct = ({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
}) => {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating,
    };
    dispatch(addToBasket(product));
  };
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className="grid grid-cols-5">
      <Image src={image} width={200} height={200} objectFit="contain" />
      {/* middle */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500 " />
            ))}
        </div>
        <p className="mt-2 text-sm my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="ZAR" />
        {hasPrime && (
          <div className="flex items-center ">
            <img
              loading="lazy"
              className="w-12 rounded-full"
              src="https://links.papareact.com/fdw"
              alt="prime delivery  logo"
            />{" "}
            <span className="text-sm text-gray-400 ml-2">
              {" "}
              free next day delivery
            </span>
          </div>
        )}
      </div>
      {/* right add remove buttons */}
      <div className="p-10 flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemToBasket} className="button ">
          Add
        </button>

        <button onClick={removeItemFromBasket} className="button ">
          Remove
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
