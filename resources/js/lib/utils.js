import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const rentType = [
  { value: '1', label: 'Yearly' },
  { value: '5', label: '5 years' },
  { value: '10', label: '10 years' },
];

export const floorPosition = [
  { value: '1', label: '1st Floor' },
  { value: '2', label: '2nd Floor' },
  { value: '3', label: '3rd Floor' },
  { value: '4', label: '4th Floor' },
  { value: '5', label: '5th Floor' },
  { value: '6', label: '6th Floor' },
  { value: '7', label: '7th Floor' },
  { value: '8', label: '8th Floor' },
  { value: '9', label: '9th Floor' },
  { value: '10', label: '10th Floor' },
];

export const getValue = (items, value)=> {
 
  const {name} =  items.find(item => item.id == value)
  return name
}

export const floorList = (rental_info) => {rental_info.floor_position.sort((a, b) => {
  
  const numA = parseInt(a, 10);
  const numB = parseInt(b, 10);
  return numA - numB;

  })
}