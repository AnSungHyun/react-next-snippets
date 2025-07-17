export type DeviceType = 'PC' | 'Mobile' | 'APP';
export type MobilePlatform = 'Android' | 'iOS' | 'Other';

export interface UserAgentInfo {
  isPC: boolean;
  isMobile: boolean;
  isApp: boolean;
  deviceType: DeviceType;
  userAgent: string;
  mobilePlatform: MobilePlatform;
  isAndroid: boolean;
  isIOS: boolean;
}

export function detectUserAgent(userAgent: string): UserAgentInfo {
  const isMobile = /Android|iPhone|iPad|BlackBerry|webOS/i.test(userAgent);
  const isPC = !isMobile;
  const isApp = userAgent.includes('MyAppName');
  const deviceType: DeviceType = isApp ? 'APP' : (isMobile ? 'Mobile' : 'PC');

  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad/i.test(userAgent);
  const mobilePlatform: MobilePlatform =
    isAndroid ? 'Android' :
      isIOS ? 'iOS' :
        'Other';

  return {
    isPC,
    isMobile,
    isApp,
    deviceType,
    userAgent,
    mobilePlatform,
    isAndroid,
    isIOS
  };
}