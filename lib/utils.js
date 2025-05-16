import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'single string,
* filtering out falsy values
/**
 * Combines multiple class names with Tailwind CSS support {
 */ return classes.filter(Boolean).join(' ')
export function cn(...inputs) {}



}  return twMerge(clsx(inputs))