interface Props {
  quantity: number;
  onPlus: () => void;
  onMinus: () => void;
}

const QuantityControl = ({ quantity, onPlus, onMinus }: Props) => {
  return (
    <div className="text-gray-500 space-y-2">
      <h4>Quantity:</h4>
      <div className="border-input border-[1px] flex items-center space-x-2 w-fit rounded-[50px] ">
        <button
          className="px-3 text-[22px] disabled:text-gray-300"
          title="Decrease quantity for product"
          onClick={onMinus}
          disabled={quantity <= 1}
        >
          —
        </button>
        <div>{quantity}</div>
        <button
          className="px-3 text-[22px] disabled:text-gray-300"
          title="Increase quantity for product"
          onClick={onPlus}
          disabled={quantity >= 20}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityControl;
