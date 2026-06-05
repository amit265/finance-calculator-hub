/**
 * Shared utility functions for financial calculations and formatting.
 */

/**
 * Formats a number as a currency string.
 * @param value The number to format.
 * @param currency The currency code (default: 'USD').
 * @param locale The locale (default: 'en-US').
 * @returns A formatted currency string.
 */
export const formatCurrency = (
  value: number, 
  currency: string = 'USD', 
  locale: string = 'en-US'
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formats a number as a percentage string.
 * @param value The number to format (e.g., 0.05 for 5%).
 * @param decimals The number of decimal places (default: 1).
 * @param locale The locale (default: 'en-US').
 * @returns A formatted percentage string.
 */
export const formatPercent = (
  value: number, 
  decimals: number = 1, 
  locale: string = 'en-US'
) => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

/**
 * Shared logic for copying results to clipboard.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};

/**
 * Shared logic for Web Share API.
 */
export const shareCalculation = async (title: string, text: string, url: string): Promise<boolean> => {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
      return false;
    }
  }
  return false;
};

/**
 * Type definition for generic calculation results.
 */
export interface CalculationResult {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  yearlyData: any[];
}
