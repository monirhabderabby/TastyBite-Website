interface Props {
    title: string;
    description: string;
    price: number;
}

const ProductInfo = ({ title, description, price }: Props) => {
    return (
        <div className="text-primary-black">
            <h1 className="font-narrow font-medium text-[30px] capitalize">
                {title}
            </h1>
            <p className="mt-2 text-gray-500">{description}</p>
            <p className="mt-1 text-[22px] font-medium text-gray-600">
                ${price}
            </p>
        </div>
    );
};

export default ProductInfo;
