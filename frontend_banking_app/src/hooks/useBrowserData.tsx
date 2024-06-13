const useBrowserData = () => {

  const getTimeZone = (): string => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  const getBrowserName = (): string => {
    const userAgent = navigator.userAgent;
    let returnValue = "unknown";

    if(userAgent.includes("Opera/")) returnValue = "Opera";
    if(userAgent.includes("Firefox/")) returnValue = "Firefox";
    if(userAgent.includes("Edg/")) returnValue = "Microsoft Edge";
    if(userAgent.includes("Safari/")) returnValue = "Safari";
    if(userAgent.includes("Chrome/")) returnValue = "Google Chrome";

    return returnValue;
  }

  const getDeviceOS = () => {
    var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }

    return os;
  }

  return { getTimeZone, getBrowserName, getDeviceOS };
};

export default useBrowserData;