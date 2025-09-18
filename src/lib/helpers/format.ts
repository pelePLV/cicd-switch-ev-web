import { formatDistanceToNow, format, parseISO } from 'date-fns';

/**
 * Format price based on department mark
 * @param amount - The amount to format
 * @param mark - The department mark (101 for Kip, other values for Baht)
 * @returns Formatted price string with appropriate currency symbol
 */
export function formatPriceByDeptMark(
  amount: number | undefined | null,
  mark: number | undefined | null
): string {
  if (!amount && amount !== 0) return '-';

  try {
    const num = parseFloat(String(amount));
    if (isNaN(num)) return '-';

    // Determine currency prefix and decimal places based on mark
    const isKip = mark === 101;
    const currencyPrefix = isKip ? '₭' : '฿';
    const decimalPlaces = isKip ? 0 : 2;

    // Format number with comma separators and specified decimal places
    const formattedAmount = num.toLocaleString('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });

    return currencyPrefix + formattedAmount;
  } catch (error) {
    console.error('Error formatting price:', error);
    return '-';
  }
}

/**
 * Format datetime to time ago format
 * @param dateTime - The datetime string to format
 * @returns Time ago string (e.g., "2 hours ago", "1 day ago")
 */
export function formatTimeAgo(dateTime: string | undefined | null): string {
  if (!dateTime) return '-';

  try {
    const date = parseISO(dateTime);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting time ago:', error);
    return '-';
  }
}

/**
 * Format datetime to readable format for tooltip
 * @param dateTime - The datetime string to format
 * @returns Formatted datetime string (e.g., "Dec 25, 2023, 2:30 PM")
 */
export function formatDateTime(dateTime: string | undefined | null): string {
  if (!dateTime) return '-';

  try {
    const date = parseISO(dateTime);
    return format(date, 'MMM dd, yyyy, h:mm a');
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return '-';
  }
}

/**
 * Convert Date object to ISO date string (YYYY-MM-DD format)
 * @param date - The Date object to convert
 * @returns ISO date string in YYYY-MM-DD format
 */
export function dateToISOString(date: Date | undefined | null): string {
  if (!date) return '';

  try {
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error converting date to ISO string:', error);
    return '';
  }
}

export function formatEmpty(
  input: string | null | undefined,
  fallback: string = '-'
) {
  return input?.trim() ? input : fallback;
}

/**
 * Format number with comma separators
 * @param value - The number to format
 * @returns Formatted number string with comma separators (e.g., "52,443")
 */
export function formatNumberWithCommas(value: number | undefined | null): string {
  if (!value && value !== 0) return '-';
  
  try {
    const num = parseFloat(String(value));
    if (isNaN(num)) return '-';
    
    return num.toLocaleString('en-US');
  } catch (error) {
    console.error('Error formatting number with commas:', error);
    return '-';
  }
}
