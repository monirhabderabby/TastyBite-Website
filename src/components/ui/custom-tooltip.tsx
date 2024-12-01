import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface Props {
  trigger: ReactNode;
  message: string;
  side: "top" | "bottom" | "left" | "right";
}

const CustomTooltip = ({ trigger, message, side }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent side={side}>{message}</TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltip;
