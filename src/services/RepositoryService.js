import { parseString } from 'react-native-xml2js';

/**
 * The RepositoryService allows to query ONE repository for packages, metadata, etc.
 * It implements a caching system for better efficiency.
 */

export const getRepositoryIndex = baseUrl => {
  let indexJson = null;
  let error = null;

  fetch(baseUrl + '/index.xml')
    .then(response => response.text())
    .then(response => {
      parseString(response, function (err, result) {
        console.log(result);
        indexJson = result;
      });
    })
    .catch(err => {
      console.log('fetch', err);
      error = err;
    });

  if (error === null) {
    return indexJson;
  }

  throw Error(error);
};
