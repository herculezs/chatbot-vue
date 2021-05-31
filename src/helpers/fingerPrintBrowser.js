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

    return fingerPrintData;
  },
};

export default allDataForFingerPrint;
