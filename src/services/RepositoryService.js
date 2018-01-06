import { DOMParser } from 'xmldom';
import RNFetchBlob from 'react-native-fetch-blob';
import { unzip } from 'react-native-zip-archive';
import FastImage from 'react-native-fast-image';
import { unixToDate } from '../utils';
const android = RNFetchBlob.android;

/**
 * The RepositoryService allows to query ONE repository for packages, metadata, etc.
 * It implements a caching system for better efficiency.
 */

const parser = new DOMParser();

const CACHE_KEY = 'cache-02';

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
      screenshots: null, // Not implemented @see 1.0
      description:
        getNodeValue(appNode, 'desc') || getNodeValue(appNode, 'desc').substring(0, 32) + '...',
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
      antiFeatures: null, // Not implemented @see 1.0
      packages: []
    };

    // Test for the featureGraphics.
    const featureGraphicPath = baseUrl + '/' + appId + '/en-US/featureGraphic.png';
    RNFetchBlob.fetch('GET', featureGraphicPath)
      .then(res => {
        if (res.info().status === 200) {
          appData.featureGraphic = featureGraphicPath;
          FastImage.preload([{ uri: featureGraphicPath }]);
        }
      })
      .catch(err => console.log(err));

    // Test for the icon.
    RNFetchBlob.fetch('GET', appData.icon)
      .then(res => {
        if (res.info().status === 200) {
          FastImage.preload([{ uri: appData.icon }]);
        } else {
          appData.icon = null;
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
const parseRepoIndexV1 = (json, uuid, baseUrl, pubkey) => {
  // TODO: Unzip index-v1.jar/index-v1.json

  const repo = JSON.parse(json); // from index-v1.json.
  const applications = repo.apps;
  const packages = repo.packages;

  const repoData = {
    meta: {
      uuid: uuid,
      icon: repo.repo.icon || null,
      name: repo.repo.name || null,
      pubkey: uuid, // GET from .rsa file.
      timestamp: repo.repo.timestamp || null,
      url: repo.repo.address || null,
      version: repo.repo.version || null,
      maxage: repo.repo.maxage || null,
      description: repo.repo.description || null
    },
    applications: []
  };

  for (let i = 0, l = applications.length; i < l; i++) {
    const app = applications[i];
    const pkgs = packages[app.packageName];

    const appData = {
      id: app.packageName || null,
      added: unixToDate(app.added) || null,
      lastUpdated: unixToDate(app.lastUpdated) || null,
      name: app.name || null,
      summary: app.summary
        ? app.summary
        : app.description ? app.description.substr(0, 32) + '...' : null || null,
      icon: baseUrl + '/icons/' + app.icon || null,
      featureGraphic:
        (app.localized &&
          app.localized['en-US'] &&
          baseUrl + '/' + app.packageName + '/en-US/' + app.localized['en-US'].featureGraphic) ||
        null,
      screenshots:
        (app.localized &&
          app.localized['en-US'] &&
          app.localized['en-US'].phoneScreenshots &&
          app.localized['en-US'].phoneScreenshots.map(
            item => baseUrl + '/' + app.packageName + '/en-US/phoneScreenshots/' + item
          )) ||
        null,
      description: app.description || null,
      localized: app.localized || null,
      license: app.license || null, // SPDX format.
      provides: app.provides || null,
      requirements: app.requirements || null,
      categories: app.categories || [],
      category: app.categories[0] || null,
      website: app.website || null,
      source: app.sourceCode || null,
      tracker: app.issueTracker || null,
      changelog: app.changelog || null,
      author: app.authorName || null,
      authorEmail: app.authorEmail || null,
      donate: app.donate || null,
      bitcoin: app.bitecoin || null,
      litecoin: app.litecoin || null,
      flattr: app.flattrID || null,
      liberapay: app.liberapayID || null,
      marketVersion: app.suggestedVersionName || null,
      marketVersionCode: app.suggestedVersionCode || null,
      antiFeatures: app.antiFeatures || null,
      packages: []
    };

    // Test/cache the featureGraphics.
    if (appData.featureGraphic !== null) {
      RNFetchBlob.fetch('GET', appData.featureGraphic)
        .then(res => {
          if (res.info().status === 200) {
            FastImage.preload([{ uri: appData.featureGraphic }]);
          } else {
            appData.featureGraphic = null;
          }
        })
        .catch(err => console.log(err));
    }

    // Test/cache the icon.
    if (appData.icon !== null) {
      RNFetchBlob.fetch('GET', appData.icon)
        .then(res => {
          if (res.info().status === 200) {
            FastImage.preload([{ uri: appData.icon }]);
          } else {
            appData.icon = null;
          }
        })
        .catch(err => console.log(err));
    }

    // Test/cache the screenshots.
    if (appData.screenshots !== null) {
      for (let o = 0, p = appData.screenshots.length; o < p; o++) {
        const screen = o[p];
        if (screen) {
          RNFetchBlob.fetch('GET', screen)
            .then(res => {
              if (res.info().status === 200) {
                FastImage.preload([{ uri: screen }]);
              } else {
                delete appData.screenshots[p];
              }
            })
            .catch(() => {});
        }
      }
    }

    for (let j = 0, k = pkgs.length; j < k; j++) {
      const pkg = pkgs[j];
      const packageData = {
        version: pkg.versionName || null,
        versionCode: pkg.versionCode || null,
        apkName: pkg.apkName || null,
        apkUrl: baseUrl + '/' + pkg.apkName || null,
        srcName: pkg.srcname || null,
        srcUrl: baseUrl + '/' + pkg.srcname || null,
        hash: pkg.hash || null,
        hashType: pkg.hashType || null,
        size: pkg.size || null,
        sdkVersion: pkg.minSdkVersion || null,
        targetSdkVersion: pkg.targetSdkVersion || null,
        added: pkg.added || null,
        sig: pkg.sig || null,
        signer: pkg.signer || null,
        permissions:
          (pkg['uses-permission'] &&
            pkg['uses-permission'].map((permission, index) => pkg['uses-permission'][index][0])) ||
          null,
        nativecode: pkg.nativecode || null
      };

      appData.packages.push(packageData);
    }

    repoData.applications.push(appData);
  }

  return repoData || null;
};

export const getCacheForParsedRepo = (baseUrl, cacheKey) => {
  const hash = RNFetchBlob.base64.encode(baseUrl + cacheKey).replace('=', '');
  const filePath = RNFetchBlob.fs.dirs.CacheDir + '/' + hash + '.json';
  return RNFetchBlob.fs.exists(filePath).then(exists => {
    if (exists) {
      console.log('Cached repo. File path: ', filePath);
      return RNFetchBlob.fs.readFile(filePath, 'utf8').then(data => {
        return JSON.parse(data);
      });
    }
    return Promise.reject();
  });
};

export const cacheParsedRepo = (baseUrl, repoData, cacheKey) => {
  const hash = RNFetchBlob.base64.encode(baseUrl + cacheKey).replace('=', '');
  const data = JSON.stringify(repoData);
  const filePath = RNFetchBlob.fs.dirs.CacheDir + '/' + hash + '.json';
  return RNFetchBlob.fs.writeFile(filePath, data, 'utf8');
};

export const sanitizeUrl = url => {
  return url
    .replace(/(^\w+:|^)\/\//, '')
    .replace(/\//g, '-')
    .replace('.', '-');
};

/**
 * Parse and return a repository for the given baseUrl asynchronously.
 *
 * @since 0.1.0
 * @param {String} baseUrl - The repository base url.
 * @return {Object} returns a Repository object, or an Error object.
 */
export const getRepositoryAsync = async baseUrl => {
  return await getCacheForParsedRepo(baseUrl, CACHE_KEY)
    .then(repoData => {
      if (repoData.meta === undefined) {
        Promise.reject();
      }

      console.log('Fetched repoData from cache for ' + baseUrl);
      console.log(repoData);
      return { success: true, meta: repoData.meta, applications: repoData.applications };
    })
    .catch(async () => {
      /**
       * Check if `${baseUrl}/index-v1.jar exists.
       * - If it does exists, unzip it & parse the index-v1.json file inside.
       * - Else, parse the old index.xml file.
       */
      const repoUUID = RNFetchBlob.base64.encode(baseUrl).replace('=', '');
      const dlPath = RNFetchBlob.fs.dirs.DownloadDir + '/' + sanitizeUrl(baseUrl);

      const indexJarPath = dlPath + '/index-v1.jar';
      const indexJarJson = dlPath + '/index-v1.json';

      const responseV1 = await RNFetchBlob.config({ path: indexJarPath }).fetch(
        'GET',
        baseUrl + '/index-v1.jar'
      );

      let repoData = null;
      const exists = await RNFetchBlob.fs.exists(indexJarPath);
      if (exists && responseV1.info().status === 200) {
        const jsonPath = await unzip(indexJarPath, dlPath);
        console.log('Unzipped index-v1 at ' + jsonPath);
        const jsonData = await RNFetchBlob.fs.readFile(jsonPath + '/index-v1.json', 'utf8');
        // console.log(jsonData);
        repoData = parseRepoIndexV1(jsonData, repoUUID, baseUrl);
        await RNFetchBlob.fs.unlink(dlPath);
        console.log('Downloaded JSON v1 repoData from the repository at ' + baseUrl);
      } else {
        const response = await RNFetchBlob.fetch('GET', baseUrl + '/index.xml');
        const responseXml = await response.text();
        const doc = parser.parseFromString(responseXml);
        repoData = parseOldRepoIndex(doc, repoUUID, baseUrl);
        console.log('Downloaded XML repoData from the repository at ' + baseUrl);
      }

      if (repoData !== null) {
        cacheParsedRepo(baseUrl, repoData, CACHE_KEY);
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
        android.actionViewIntent(res.path(), 'application/vnd.android.package-archive');
      });
  } catch (e) {
    console.log(e);
  }
};
