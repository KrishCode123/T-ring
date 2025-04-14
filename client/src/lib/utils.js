import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import animationData from "@/assets/lottie-json";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-blue-500 text-white border-[1px] border-[#ff006faa]",
  "bg-orange-500 text-white border-[1px] border-[#ffd60abb]",
  "bg-yellow-500 text-white border-[1px] border-[#06d6a0bb]",
  "bg-green-500 text-white border-[1px] border-[#4cc9f0bb]",
];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0]; 
};

export const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
