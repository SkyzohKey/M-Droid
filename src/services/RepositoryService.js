import { DOMParser } from 'xmldom';
import RNFetchBlob from 'react-native-fetch-blob';
const android = RNFetchBlob.android;

/**
 * The RepositoryService allows to query ONE repository for packages, metadata, etc.
 * It implements a caching system for better efficiency.
 */

const parser = new DOMParser();

/**
 * Check if value is defined for a node, and if that node exists in the parent node.
 *
 * @since 0.1.1
 * @param {Element} parent - Parent's node.
 * @param {String} childName - The child to check.
 * @return {Boolean} true if the node exists and as a value inside itself.
 */
const nodeHasValue = (parent, childName) => {
  if (
    parent.getElementsByTagName(childName)[0] === undefined ||
    parent.getElementsByTagName(childName)[0].childNodes[0] === undefined ||
    parent.getElementsByTagName(childName)[0].childNodes[0].nodeValue === undefined
  ) {
    return false;
  }

  return true;
};

/**
 * Get a node value from it's parent node.
 *
 * @since 0.1.0
 * @param {Element} parent - The parent node from which to find the specified node.
 * @param {String} childName - Node's tagname
 * @return {String|null} returns the node's value or null if the node do not has value.
 */
const getNodeValue = (parent, childName) => {
  if (!nodeHasValue(parent, childName)) {
    return null;
  }

  // For safety.
  const nodeAsString = String(parent.getElementsByTagName(childName)[0].childNodes[0].nodeValue);
  return nodeAsString;
};

/**
 * Get a node values as an array from it's parent node.
 * F-Droid supports serialized arrays where values are separated by a comma.
 * This method find the node then split on comma and returns an array.
 *
 * @since 0.1.0
 * @param {Element} parent - The parent node from which to find the specified node.
 * @param {String} childName - Node's tagname
 * @return {Array} returns the node's values deserialized as a Javascript array.
 */
const getNodeArray = (parent, childName) => {
  if (!nodeHasValue(parent, childName)) {
    return null;
  }

  const nodeAsArray = String(
    parent.getElementsByTagName(childName)[0].childNodes[0].nodeValue
  ).split(',');
  return nodeAsArray;
};

/**
 * Parse a given index.xml and extracts values from it to make it
 * processable by the app.
 *
 * @deprecated This method has been deprectated in version 0.1.1
 * in favor of #parseRepoIndexV1 as of F-droid 1.0.0
 *
 * @since 0.1.0
 * @param {Document} doc - The index.xml to be parsed.
 * @param {String} uuid - A unique identifier for this repo.
 * @param {String} baseUrl - The repository's base URL.
 * @return {Object} returns the parsed repository as an Object.
 */
const parseOldRepoIndex = (doc, uuid, baseUrl) => {
  const repo = doc.getElementsByTagName('repo')[0] || null;
  const applications = doc.getElementsByTagName('application');
  const repoData = {
    meta: {
      uuid: uuid,
      icon: repo.getAttribute('icon') || null,
      name: repo.getAttribute('name') || null,
      pubkey: repo.getAttribute('pubkey') || null,
      timestamp: repo.getAttribute('timestamp') || null,
      url: repo.getAttribute('url') || null,
      version: repo.getAttribute('version') || null,
      maxage: repo.getAttribute('maxage') || null,
      description: getNodeValue(repo, 'description')
    },
    applications: []
  };

  for (let i = 0, l = applications.length; i < l; i++) {
    const appNode = applications[i];
    const appPackages = appNode.getElementsByTagName('package');
    const appId = appNode.getAttribute('id') || getNodeValue(appNode, 'id');
    const appData = {
      id: appId,
      added: getNodeValue(appNode, 'added'),
      lastUpdated: getNodeValue(appNode, 'lastupdated'),
      name: getNodeValue(appNode, 'name'),
      summary: getNodeValue(appNode, 'summary'),
      icon: baseUrl + '/icons/' + getNodeValue(appNode, 'icon'),
      featureGraphic: null,
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
      litecoin: getNodeValue(appNode, 'litecoin'),
      flattr: getNodeValue(appNode, 'flattr'),
      liberapay: getNodeValue(appNode, 'liberapay'),
      marketVersion: getNodeValue(appNode, 'marketversion'),
      marketVersionCode: getNodeValue(appNode, 'marketvercode'),
      packages: []
    };

    // Test for the featureGraphics.
    const featureGraphicPath = baseUrl + '/' + appId + '/en-US/featureGraphic.png';
    RNFetchBlob.fetch('GET', featureGraphicPath)
      .then(res => {
        if (res.info().status === 200) {
          appData.featureGraphic = featureGraphicPath;
        }
      })
      .catch(err => console.log(err));

    for (let j = 0, k = appPackages.length; j < k; j++) {
      const packageNode = appPackages[j];
      const packageData = {
        version: getNodeValue(packageNode, 'version'),
        versionCode: getNodeValue(packageNode, 'versioncode'),
        apkName: getNodeValue(packageNode, 'apkname'),
        apkUrl: baseUrl + '/' + getNodeValue(packageNode, 'apkname'),
        srcName: getNodeValue(packageNode, 'srcname'),
        srcUrl: baseUrl + '/' + getNodeValue(packageNode, 'srcname'),
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
 * Parse a given index-v1.jar and extracts index.json from it.
 * The process that index.json file in order to make it compliant
 * with the internal Redux state structure.
 *
 * @since 0.1.1
 * @param {String} json - The index.json to be processes.
 * @param {String} uuid - A unique identifier for this repo.
 * @param {String} baseUrl - The repository's base URL.
 * @return {Object} returns the processed repository as an Object.
 */
const parseRepoIndexV1 = (json, uuid, baseUrl) => {
  // TODO: Unzip the .jar file and get index.json content.
  // TODO: Parse the json file to make it compliant (ie. same fields) with index.xml
  // TODO: return the data.
  // Unless that is done, proxy to the old method.
};

export const getCacheForParsedRepo = baseUrl => {
  const hash = RNFetchBlob.base64.encode(baseUrl).replace('=', '');
  const filePath = RNFetchBlob.fs.dirs.CacheDir + '/' + hash;
  console.log('File path: ', filePath);
  return RNFetchBlob.fs.exists(filePath).then(exists => {
    if (exists) {
      return RNFetchBlob.fs.readFile(filePath, 'utf8').then(data => {
        return JSON.parse(data);
      });
    }
    return Promise.reject();
  });
};

export const cacheParsedRepo = (baseUrl, repoData) => {
  const hash = RNFetchBlob.base64.encode(baseUrl).replace('=', '');
  const data = JSON.stringify(repoData);
  const filePath = RNFetchBlob.fs.dirs.CacheDir + '/' + hash;
  return RNFetchBlob.fs.writeFile(filePath, data, 'utf8');
};

/**
 * Parse and return a repository for the given baseUrl asynchronously.
 *
 * @since 0.1.0
 * @param {String} baseUrl - The repository base url.
 * @return {Object} returns a Repository object, or an Error object.
 */
export const getRepositoryAsync = async baseUrl => {
  /**
   * TODO: Check if `${baseUrl}/index-v1.jar exists.
   *        - If exists, unzip it and parse the index-v1.json file inside.
   *        - Else, download the old index.xml and parse it using parseOldRepoIndex.
   */
  return await getCacheForParsedRepo(baseUrl)
    .then(repoData => {
      console.log('Fetched repoData from cache for ' + baseUrl);
      console.log(repoData);
      return { success: true, meta: repoData.meta, applications: repoData.applications };
    })
    .catch(async () => {
      const repoUUID = RNFetchBlob.base64.encode(baseUrl).replace('=', '');
      // const response = await fetch(baseUrl + '/index.xml');
      const task = RNFetchBlob.config({ fileCache: true });
      const response = await task.fetch('GET', baseUrl + '/index.xml');
      const responseXml = await response.text();
      const doc = parser.parseFromString(responseXml);
      const repoData = parseOldRepoIndex(doc, repoUUID, baseUrl);
      console.log('Downloaded repoData from the repository at ' + baseUrl);

      if (repoData !== null) {
        cacheParsedRepo(baseUrl, repoData);
        console.log('Cached repoData for ' + baseUrl);
        console.log(repoData);
        return { success: true, meta: repoData.meta, applications: repoData.applications };
      }
      return { success: false, error: 'Unknown error, cannot fetch repository ' + baseUrl };
    });
};

export const downloadApp = async (appName, apkName, apkUrl) => {
  try {
    RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        path: RNFetchBlob.fs.dirs.DownloadDir + apkName,
        title: apkName,
        description: 'Downloading & installing « ' + appName + ' ».',
        mime: 'application/vnd.android.package-archive',
        mediaScannable: true,
        notification: true
      }
    })
      .fetch('GET', apkUrl)
      .then(res => {
        android.actionViewIntent(
          RNFetchBlob.fs.dirs.DownloadDir + '/' + apkName,
          'application/vnd.android.package-archive'
        );
      });
  } catch (e) {
    console.log(e);
  }
};
