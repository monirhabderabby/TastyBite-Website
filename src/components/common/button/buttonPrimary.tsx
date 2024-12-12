"use client";

import { Button } from "@/components/ui/button";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    btnType?: "button" | "submit" | "reset";
}

const ButtonPrimary = ({ text, onClick, btnType }: ButtonProps) => {
    return (
        <Button
            onClick={onClick || (() => {})}
            {...(btnType ? { type: btnType } : {})}
            className="uppercase w-full md:w-auto text-white hover:text-primary-orange bg-primary-orange hover:bg-transparent rounded-[50px] text-base px-[41px] py-[14px] h-[50px] tracking-wide border-[1px] border-primary-orange font-semibold duration-300"
        >
            {text}
        </Button>
    );
};

export default ButtonPrimary;
