import { DOMParser } from 'xmldom';
import { AsyncStorage } from 'react-native';
import RNFS from 'react-native-fs';

/**
 * The RepositoryService allows to query ONE repository for packages, metadata, etc.
 * It implements a caching system for better efficiency.
 */

const parser = new DOMParser();

/**
 * Get a node value from it's parent node.
 *
 * @param {Element} parent - The parent node from which to find the specified node.
 * @param {String} nodeName - Node's tagname
 * @return {String} returns the node's value.
 */
const getNodeValue = (parent, nodeName) => {
  if (parent.getElementsByTagName(nodeName)[0] === undefined) {
    return null;
  }

  if (parent.getElementsByTagName(nodeName)[0].childNodes[0] === undefined) {
    return null;
  }

  if (parent.getElementsByTagName(nodeName)[0].childNodes[0].nodeValue === undefined) {
    return null;
  }

  // For safety.
  return parent.getElementsByTagName(nodeName)[0].childNodes[0].nodeValue;
};

/**
 * Get a node values as an array from it's parent node.
 * F-Droid has array-like fields where values are separated by a comma.
 * This method find the node then split on comma and returns an array.
 *
 * @param {Element} parent - The parent node from which to find the specified node.
 * @param {String} nodeName - Node's tagname
 * @return {Array} returns the node's values as an array.
 */
const getNodeArray = (parent, nodeName) => {
  if (parent.getElementsByTagName(nodeName)[0] === undefined) {
    return null;
  }

  const nodeValue = String(parent.getElementsByTagName(nodeName)[0].childNodes[0].nodeValue);
  const nodeArray = nodeValue.split(',');
  return nodeArray;
};

/**
 * Get a path to a cached repo JSON for a given uuid.
 *
 * @param {String} uuid - An UUID, used as the filename for cached data.
 * @return {String} returns the path to file.
 */
const getPathFromCache = uuid => {
  return RNFS.CachesDirectoryPath + '/' + uuid + '.json';
};

/**
 * Parse a given index.xml and extracts values from it to make it
 * processable by the app.
 *
 * @param {Document} doc - The index.xml to be parsed.
 * @param {String} uuid - A unique identifier for this repo.
 * @return {Object} returns the parsed repository.
 */
const parseRepoIndex = (doc, uuid) => {
  const repo = doc.getElementsByTagName('repo')[0] || null;
  const applications = doc.getElementsByTagName('application');
  const repoData = {
    uuid: uuid,
    icon: repo.getAttribute('icon') || null,
    name: repo.getAttribute('name') || null,
    pubkey: repo.getAttribute('pubkey') || null,
    timestamp: repo.getAttribute('timestamp') || null,
    url: repo.getAttribute('url') || null,
    version: repo.getAttribute('version') || null,
    maxage: repo.getAttribute('maxage') || null,
    description: getNodeValue(repo, 'description'),
    applications: []
  };

  for (let i = 0, l = applications.length; i < l; i++) {
    const appNode = applications[i];
    const appPackages = appNode.getElementsByTagName('package');
    const appData = {
      id: appNode.getAttribute('id') || getNodeValue(appNode, 'id'),
      added: getNodeValue(appNode, 'added'),
      lastUpdated: getNodeValue(appNode, 'lastupdated'),
      name: getNodeValue(appNode, 'name'),
      summary: getNodeValue(appNode, 'summary'),
      icon: getNodeValue(appNode, 'icon'),
      description: getNodeValue(appNode, 'desc'),
      license: getNodeValue(appNode, 'license'), // SPDX format.
      provides: getNodeValue(appNode, 'provides'),
      requirements: getNodeArray(appNode, 'requirements'),
      categories: getNodeArray(appNode, 'categories'),
      category: getNodeValue(appNode, 'category'),
      website: getNodeValue(appNode, 'web'),
      source: getNodeValue(appNode, 'source'),
      tracker: getNodeValue(appNode, 'tracker'),
      changelog: getNodeValue(appNode, 'changelog'),
      author: getNodeValue(appNode, 'author'),
      authorEmail: getNodeValue(appNode, 'email'),
      donate: getNodeValue(appNode, 'donate'),
      bitcoin: getNodeValue(appNode, 'bitcoin'),
      flattr: getNodeValue(appNode, 'flattr'),
      liberapay: getNodeValue(appNode, 'liberapay'),
      marketversion: getNodeValue(appNode, 'marketversion'),
      marketvercode: getNodeValue(appNode, 'marketvercode'),
      packages: []
    };

    for (let j = 0, k = appPackages.length; j < k; j++) {
      const packageNode = appPackages[j];
      const packageData = {
        version: getNodeValue(packageNode, 'version'),
        versionCode: getNodeValue(packageNode, 'versioncode'),
        apkname: getNodeValue(packageNode, 'apkname'),
        srcname: getNodeValue(packageNode, 'srcname'),
        hash: getNodeValue(packageNode, 'hash'),
        size: getNodeValue(packageNode, 'size'),
        sdkVersion: getNodeValue(packageNode, 'sdkver'),
        targetSdkVersion: getNodeValue(packageNode, 'targetSdkVersion'),
        added: getNodeValue(packageNode, 'added'),
        sig: getNodeValue(packageNode, 'sig'),
        permissions: getNodeArray(packageNode, 'permissions'),
        nativecode: getNodeArray(packageNode, 'nativecode')
      };

      appData.packages.push(packageData);
    }

    repoData.applications.push(appData);
  }

  return repoData || null;
};

/**
 * Get a repository index.xml file in async mode.
 *
 * @param {String} baseUrl - The repository base url.
 * @return {String} returns the parsed index as JSON.
 */
export const getRepositoryAsync = async baseUrl => {
  let dataCache = null;
  let repoCache = null;

  try {
    console.log('getRepositoryAsync => ', baseUrl);
    dataCache = await AsyncStorage.getItem('repo/' + baseUrl);
    repoCache = dataCache !== null ? JSON.parse(dataCache) : null;
    console.log('Fetch repo cache from AsyncStorage for', baseUrl);
    console.log(repoCache, dataCache);

    const response = await fetch(baseUrl + '/index.xml');
    console.log('Fetched index.xml for repo', baseUrl);

    const etag = response.headers.has('ETag') ? response.headers.get('ETag') : null;

    // Here we check our caching system.
    console.log('Checking presence of ETag value for repo', baseUrl, etag);
    if (repoCache && etag && etag === repoCache.etag) {
      console.log('Found repository cache data', repoCache);
      const fileExists = await RNFS.exists(getPathFromCache(repoCache.uuid));
      if (fileExists) {
        console.log('ETag found for repo', baseUrl);
        const repoFile = await RNFS.readFile(getPathFromCache(repoCache.uuid), 'utf8');
        const repo = JSON.parse(repoFile);
        console.log('Parsed repo found in cache', getPathFromCache(repoCache.uuid));
        console.log('Using cached version of the repo');
        return repo;
      }
    }

    console.log('Using downloaded version of the repo');
    const responseXml = await response.text();
    const doc = parser.parseFromString(responseXml);
    const repoUUID = uuidv4() || Math.random();
    const repoData = parseRepoIndex(doc, repoUUID);
    console.log('Repo parsed to JSON', repoData, etag);

    if (repoData) {
      console.log('Writing data to cache', etag, repoData);
      await AsyncStorage.setItem('repo/' + baseUrl, JSON.stringify({ etag: etag, uuid: repoUUID }));
      await RNFS.writeFile(getPathFromCache(repoUUID), JSON.stringify(repoData), 'utf8');
    }

    return repoData;
  } catch (e) {
    console.log('getRepositoryAsync: ' + e.message);
    console.log(e);
    return null;
  }
};
