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
