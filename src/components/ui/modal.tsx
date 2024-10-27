import React from "react";
import { DrawerContent, ResponsiveDrawer } from "./vaul-main";

interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Modal({ children, open, setOpen }: Props) {
  return (
    <>
      <ResponsiveDrawer open={open} setOpen={setOpen}>
        <DrawerContent>{children}</DrawerContent>
      </ResponsiveDrawer>
    </>
  );
}
