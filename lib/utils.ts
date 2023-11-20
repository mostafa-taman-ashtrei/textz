import { type ClassValue, clsx } from "clsx";
import { randomColorNameList } from "@/constants";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const generateRandomName = () => randomColorNameList[Math.floor(Math.random() * randomColorNameList.length)];