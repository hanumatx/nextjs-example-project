import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomDriver(): { name: string; mobile: string } {
  try {
    const driverNames = [
      "Rajesh Kumar",
      "Amit Singh", 
      "Suresh Gupta",
      "Vikash Sharma",
      "Manoj Yadav",
      "Ravi Tiwari",
      "Santosh Verma",
      "Deepak Mishra",
      "Ashok Pandey",
      "Ramesh Chandra"
    ];
    
    const randomName = driverNames[Math.floor(Math.random() * driverNames.length)];
    
    // Generate a random 10-digit mobile number starting with '91' (India country code) + '9'
    const randomMobile = '+91 9' + Math.floor(Math.random() * 100000000)
      .toString().padStart(8, '0');
    
    return { name: randomName, mobile: randomMobile };
  } catch (error) {
    console.error("Error generating driver data:", error);
    return { name: "N/A", mobile: "N/A" };
  }
}
