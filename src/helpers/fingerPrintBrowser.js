import apiRequest from '@api/modules/apiRequest';
// eslint-disable-next-line no-unused-vars
import ClientJS from 'clientjs';

const allDataForFingerPrint = {
  async getGeolocation() {
    return Promise.resolve(await apiRequest.getCurrentGeolocation());
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

export default allDataForFingerPrint;
