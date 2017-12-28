import { DOMParser } from 'xmldom';

/**
 * The RepositoryService allows to query ONE repository for packages, metadata, etc.
 * It implements a caching system for better efficiency.
 */

const parser = new DOMParser();

/**
 * Get a repository index.xml file in async mode.
 *
 * @param {String} baseUrl - The repository base url.
 * @return {String} returns the parsed index as JSON.
 */
export const getRepositoryAsync = async baseUrl => {
  const getNodeValue = (parent, nodeName) => {
    if (parent.getElementsByTagName(nodeName)[0] === undefined) {
      return null;
    }

    // For safety.
    return parent.getElementsByTagName(nodeName)[0].childNodes[0].nodeValue;
  };

  const getNodeArray = (parent, nodeName) => {
    if (parent.getElementsByTagName(nodeName)[0] === undefined) {
      return null;
    }

    const nodeValue = String(parent.getElementsByTagName(nodeName)[0].childNodes[0].nodeValue);
    const nodeArray = nodeValue.split(',');
    return nodeArray;
  };

  try {
    let response = await fetch(baseUrl + '/index.xml');
    let responseXml = await response.text();
    const doc = parser.parseFromString(responseXml);
    const repo = doc.getElementsByTagName('repo')[0];
    const applications = doc.getElementsByTagName('application');

    const repoData = {
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
        id: appNode.getAttribute('id'),
        added: getNodeValue(appNode, 'added'),
        lastUpdated: getNodeValue(appNode, 'lastupdated'),
        name: getNodeValue(appNode, 'name'),
        summary: getNodeValue(appNode, 'summary'),
        icon: getNodeValue(appNode, 'icon'),
        description: getNodeValue(appNode, 'desc'),
        license: getNodeValue(appNode, 'license'), // SPDX format.
        provides: getNodeValue(appNode, 'provides'),
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

    return repoData;
  } catch (e) {
    console.log('getRepositoryAsync: ' + e.message);
  }
};
