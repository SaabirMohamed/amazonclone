import Product from "./Product";

const ProductFeed = ({ products }) => {
  return (
    <div className="mx-auto md:-mt-52 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products
        .slice(0, 4)
        .map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            image={image}
            category={category}
          />
        ))}
      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt="advert"
      />
      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, price, description, category, image }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              image={image}
              category={category}
            />
          ))}
      </div>
      {products
        .slice(5, products.length)
        .map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            image={image}
            category={category}
          />
        ))}
    </div>
  );
};

export default ProductFeed;
