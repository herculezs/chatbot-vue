const stringToBoolean = string => (string === 'false' ? false : !!string);

const geolocationDetectService = {
  // true = google
  // false = bigData
  isGoogleOrBigData() {
    return stringToBoolean(process.env.GOOGLE_OR_BIGDATA_GEOLOCATION) === true;
  },
};

export default geolocationDetectService;
