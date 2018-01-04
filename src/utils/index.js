/**
 * Given a number of bytes, returns a human readable file size.
 * It also does takes care of appending the correct suffix up-to Yeta bytes.
 *
 * @param {Number} bytes - A number, in bytes.
 * @return {String} returns an human readable file size with suffix.
 */
export const toFileSize = bytes => {
  const m = Math;
  const exp = (m.log(bytes) / m.log(1024)) | 0;
  const res = (bytes / m.pow(1024, exp)).toFixed(2);
  return [res, exp === 0 ? 'bytes' : 'KMGTPEZY'[exp - 1] + 'B'].join(' ');
};

/**
 * Given an array of objects, removes duplicates based on a specified
 * predicate. It returns a new array instead of mutating the initial one.
 *
 * @param {Array} items - An array of items to removes duplicates from
 * @param {Function} predicate - A function that got the item argument.
 * @return {Array} returns a new array with duplicates removed.
 */
export const removeDuplicates = (items, predicate) => {
  const newItems = items.filter(
    (item, index, self) => index === self.findIndex(t => predicate(item, t))
  );

  return newItems;
};
