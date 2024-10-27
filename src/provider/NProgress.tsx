"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NProgress = () => {
  return (
    <ProgressBar
      height="3px"
      color="#FD9D3E"
      options={{ showSpinner: false }}
    />
  );
};

export default NProgress;
