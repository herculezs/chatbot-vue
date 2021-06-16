import apiRequest from '@api/modules/apiRequest';
import geolocationDetectService from '@helpers/./geolocationDetectService';
// eslint-disable-next-line no-unused-vars
import ClientJS from 'clientjs';

const differentsServices = {
  getCoordinates() {
    return new Promise(((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }));
  },
  getGeolocation() {
    return this.getCoordinates()
      .then((position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        return `${latitude},${longitude}`;
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => false);
  },
  async requestSearchGeoPosition(latlng) {
    const isGoogle = geolocationDetectService.isGoogleOrBigData();

    if (isGoogle) {
      if (latlng) {
        const googleGeoData = await apiRequest.getCurrentGeolocation(latlng);
        const resultParse = this.parseGoogleData(googleGeoData);
        const fullResult = {
          ...resultParse,
          type: 'google',
          allowGetGeolocation: true,
        };
        return Promise.resolve(fullResult);
      }
      return Promise.resolve({ type: 'google', allowGetGeolocation: false });
    }
    if (!isGoogle) {
      if (latlng) {
        return Promise.resolve(apiRequest.getCurrentGeolocationBigData(latlng)).then(x => ({
          ...x,
          type: 'bigData',
          allowGetGeolocation: true,
        }));
      }
      return Promise.resolve({ type: 'bigData', allowGetGeolocation: false });
    }
    return Promise.resolve({ type: 'bigData', allowGetGeolocation: false });
  },
  avatarPhotoService(email, id) {
    this.$api.apiRequest.getAvatarApi(email).then((x) => {
      if (x.trim().startsWith('document')) {
        const srcStart = x.indexOf('src') + 5;
        const titleStart = x.indexOf('title') + 7;
        const result = {
          link: x.substring(srcStart, x.indexOf("'", srcStart)),
          title: x.substring(titleStart, x.indexOf("'", titleStart)),
        };
        this.$api.auth.saveUserPhoto(result, id);
      } else {
        this.$api.auth.saveUserPhoto({ link: '', title: '' }, id);
      }
    });
  },
  // eslint-disable-next-line no-unused-vars
  parseGoogleData(data) {
    if (data.results[0]) {
      const result = {};
      result.lat = data.results[0].geometry.location.lat;
      result.lng = data.results[0].geometry.location.lng;
      const currentResult = data.results[0].address_components;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= currentResult.length - 1; i++) {
        if (currentResult[i].types.indexOf('street_number') !== -1) {
          result.street_number = currentResult[i].long_name;
        } else if (currentResult[i].types.indexOf('route') !== -1) {
          result.route = currentResult[i].long_name;
        } else if (currentResult[i].types.indexOf('locality') !== -1) {
          result.locality = currentResult[i].long_name;
        } else if (currentResult[i].types.indexOf('administrative_area_level_3') !== -1) {
          result.administrative_area_level_3 = currentResult[i].long_name;
        } else if (currentResult[i].types.indexOf('administrative_area_level_2') !== -1) {
          result.administrative_area_level_2 = currentResult[i].long_name;
        } else if (currentResult[i].types.indexOf('administrative_area_level_1') !== -1) {
          result.administrative_area_level_1 = currentResult[i].long_name;
        } else if (currentResult[i].types.indexOf('country') !== -1) {
          result.country = currentResult[i].long_name;
        } else if (currentResult[i].types.indexOf('postal_code') !== -1) {
          result.postal_code = currentResult[i].long_name;
        }
      }
      return result;
    }
    return false;
  },
  getClientData() {
    const client = new window.ClientJS();
    const fingerPrintData = {};
    fingerPrintData.installedFont = client.getFonts();
    fingerPrintData.fingerPrintCode = client.getFingerprint();
    fingerPrintData.browser = client.getBrowser();
    fingerPrintData.browserVersion = client.getBrowserMajorVersion();
    fingerPrintData.operationSystem = client.getOS();
    fingerPrintData.operationSystemVersion = client.getOSVersion();
    fingerPrintData.deviceType = client.getDeviceType();
    fingerPrintData.mobileBrowser = client.isMobile();
    fingerPrintData.currentResolution = client.getCurrentResolution();
    fingerPrintData.colorDepth = client.getColorDepth();
    fingerPrintData.mobileAndroid = client.isMobileAndroid();
    fingerPrintData.mobileWindows = client.isMobileWindows();
    fingerPrintData.mobileBlackBerry = client.isMobileBlackBerry();
    fingerPrintData.mobileIOS = client.isMobileIOS();

    return fingerPrintData;
  },
};

export default differentsServices;
