import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Get status message based on status code
 *
 * @param {number} statusCode
 * @returns {string} A status text for the available status codes
 */
const getStatusText = (statusCode: number): string => {
  const statusMessages: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  };

  return statusMessages[statusCode] || '';
};

/**
 * Generates a random integer between 1 and 100 (inclusive)
 *
 * @returns {number} A random number from 1 to 100
 */
const generateRandomValue = (): number => Math.floor(Math.random() * 100) + 1;

export { cn, getStatusText, generateRandomValue };
