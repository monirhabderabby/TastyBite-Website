interface Props {
    title: string;
    description: string;
    price: number;
    // extras: TExtra[];
    // sizes: TSize[];
}

const ProductInfo = ({ title, description, price }: Props) => {
    return (
        <div className="text-primary-black">
            <h1 className="font-narrow font-medium text-[22px] md:text-[30px] uppercase ">
                {title}
            </h1>
            <p className="mt-2 text-gray-500">{description}</p>
            <p className="mt-2 text-3xl font-medium text-primary-gray">
                ${price}
            </p>

            <div>
                {/* {sizes && (
          <div className="mt-3 md:mt-6">
            <p className="mb-1 text-primary-gray">Sizes</p>
            <div className="flex flex-wrap items-center gap-2">
              {sizes.map((size) => (
                <Button
                  key={size.size}
                  size="sm"
                  variant={"outline"}
                  className="border border-primary-black/50 rounded-none text-primary-gray"
                >
                  {size.size}
                </Button>
              ))}
            </div>
          </div>
        )} */}

                {/* {extras && (
          <div className="mt-3">
            <p className="mb-1 text-primary-gray">Extras</p>
            <div className="flex flex-wrap items-center gap-2">
              {extras.map((extra) => (
                <Button
                  key={extra.name}
                  size="sm"
                  variant={"outline"}
                  className="border border-primary-black/50 rounded-none text-primary-gray"
                >
                  {extra.name}
                </Button>
              ))}
            </div>
          </div>
        )} */}
            </div>
        </div>
    );
};

export default ProductInfo;
