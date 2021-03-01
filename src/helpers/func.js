const stringToBoolean = string => (string === 'false' ? false : !!string);

const isFreeVersion = () => stringToBoolean(process.env.VUE_APP_VERSION_FREE) === true;

export default isFreeVersion;
