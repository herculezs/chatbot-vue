import FingerprintJS from '@fingerprintjs/fingerprintjs';

const fpPromise = FingerprintJS.load();

const visitorBrowserId = (async () => {
  const fp = await fpPromise;
  const result = await fp.get();

  const { visitorId } = result;
  return visitorId;
})();

export default visitorBrowserId;
