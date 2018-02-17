/**
 * Given arguments, returns a mocked Response.
 *
 * @param {Number} status A status code for the response.
 * @param {String} statusText A status text for the response.
 * @param {String} responseText A response text.
 * @return {Response} Returns a mocked Response as json, based on args.
 */
export const mockResponse = (status, statusText, responseText) => {
  return new window.Response(responseText, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};
