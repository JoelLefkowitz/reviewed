import { validateAll } from "./arrays";
import { validateWith, validateWithAtLeast } from "./validate";

/**
 * Alias for validateAll
 *
 * @category Aliases
 * @see {@link validateAll}
 */
export const isArrayOf = validateAll;

/**
 * Alias for validateWith
 *
 * @category Aliases
 * @see {@link validateWith}
 */
export const isRecordOf = validateWith;

/**
 * Alias for validateWithAtLeast
 *
 * @category Aliases
 * @see {@link validateWithAtLeast}
 */
export const isRecordOfAtLeast = validateWithAtLeast;
