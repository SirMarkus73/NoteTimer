import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function today(): Date {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	return today;
}
