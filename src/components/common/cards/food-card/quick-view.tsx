// Packages
import { Heart, Share2 } from "lucide-react";

// Local imports
import { Button } from "@/components/ui/button";

const QuickViewAction = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Button className="uppercase rounded-[40px] h-[40px] flex-1">
        Add To Cart
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full h-[40px] w-[40px]"
        title="Add to favorites"
      >
        <Heart className="text-gray-500 h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full h-[40px] w-[40px]"
        title="Share this content"
      >
        <Share2 className="text-gray-500 h-5 w-5" />
      </Button>
    </div>
  );
};

export default QuickViewAction;
