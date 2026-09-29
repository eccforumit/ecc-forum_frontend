/**
 * Combines multiple class names efficiently, removing duplicates
 */
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Checks if value is one of the possible values
 */
export function isOneOf<T>(value: T, options: T[]): boolean {
  return options.includes(value);
}

/**
 * Transforms a string into kebab case (for CSS classes)
 */
export function toKebabCase(string: string): string {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}