"use server"

import {useClientToServerLogger} from "@/hooks/useLogger";

/**
 * @description
 * 클라이언트에서 서버로 로그를 전송하는 훅
 * @param logLevel
 * @param message
 * @use
 * useClientLogger("info", "client to server log!");
 */

export async function useClientLogger(logLevel: 'info' | 'warn' | 'error' |'debug' | 'verbose' | 'silly'  , message: string) {
  try {
    switch (logLevel) {
      case 'info':
        await useClientToServerLogger.info(`${message}`);
        break;
      case 'warn':
        await useClientToServerLogger.warn(`${message}`);
        break;
      case 'error':
        await useClientToServerLogger.error(`${message}`);
        break;
      case 'debug':
        await useClientToServerLogger.debug(`${message}`);
        break;
      case 'verbose':
        await useClientToServerLogger.verbose(`${message}`);
        break;
      case 'silly':
        await useClientToServerLogger.silly(`${message}`);
        break;
      // default:
      //   throw new Error("Invalid log level");
    }
    return { success: true }; // 성공 응답
  } catch (error) {
    console.error("Logging error:", error);
    return { success: false, error: error }; // 실패 응답
  }
}

// export async function useServerLogger(message: string) {
//
//   try {
//     await useLogger.info(`Request: ${message}`);
//   } catch (error) {
//     console.error("Logging error:", error);
//   }
// }
