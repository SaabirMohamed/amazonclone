import moment from "moment";
import Currency from "react-currency-formatter";
const Order = ({ id, amount, amountShipping, images, timestamp, items }) => {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">Order Placed</p>
        </div>
        <div>
          <p className="font-bold text-xs">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="USD" /> - Next Day Delivery{" "}
            <Currency currency="USD" quantity={amountShipping} />
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.length}items
        </p>
        <p className="absolute top-2 rihgt-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {id}
        </p>
        <div className="p-5 sm-p10">
          <div>
            {images.map((image) => (
              <img
                alt="product"
                src={image}
                className="object-contain h-20 sm:h32 overflow-x-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
