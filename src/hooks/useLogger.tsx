import {createLogger, transports, format, Logger} from 'winston';
import DailyRotateFile from "winston-daily-rotate-file";
import { getCurrentDateTime } from "@/utils/dateUtils";

/**
 * @description
 * Logger를 생성하는 함수입니다.
 * @use
 * useServerLogger.error("cart page error");
 * useServerLogger.warn("cart page warn");
 * useServerLogger.info("cart page info");
 * useServerLogger.verbose("cart page verbose");
 * useServerLogger.debug("cart page debug");
 * useServerLogger.silly("cart page silly");
 * useServerLogger.silly(APPLICATION_MESSAGES.LOGIN_FAILED);
 * useServerLogger.silly(getFormatMessage(APPLICATION_MESSAGES.PASSWORD_TOO_SHORT,String(10)));
 */

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'nanushka';
// 서버 Logger 생성
const serverLogger = createLogger({
  level: 'silly',
  format: format.combine(
    format.timestamp({
      format: () => getCurrentDateTime()
    }),
    format.simple(),
    format.printf(info => `[${info.timestamp}] [SERVER] ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }) // 콘솔 로그에 색상 적용
      )
    }),
    new DailyRotateFile({
      filename: `logs/${siteName}-server-log-%DATE%.log`, // 서버 로그 파일 이름
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
      // format: format.combine(
      //   format.timestamp({
      //     format: () => getCurrentDateTime()
      //   }),
      //   format.printf(info => `[${info.timestamp}] [SERVER] ${info.level}: ${info.message}`)
      // )
    })
  ],
});

// 클라이언트 Logger 생성
const clientLogger = createLogger({
  level: 'silly',
  format: format.combine(
    format.timestamp({
      format: () => getCurrentDateTime()
    }),
    format.simple(),
    format.printf(info => `[${info.timestamp}] [CLIENT] ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true })
      )
    }),
    new DailyRotateFile({
      filename: `logs/${siteName}-client-log-%DATE%.log`, // 클라이언트 로그 파일 이름
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
      // format: format.combine(
      //   format.timestamp({
      //     format: () => getCurrentDateTime()
      //   }),
      //   format.printf(info => `[${info.timestamp}] [CLIENT] ${info.level}: ${info.message}`)
      // )
    })
  ],
});

// 비동기 로깅 함수
const asyncLog = (logger: Logger, level: keyof Logger, message: string): Promise<void> => {
  return new Promise((resolve) => {
    setImmediate(() => {
      logger[level](message);
      resolve();
    });
  });
};

// 서버와 클라이언트 로거 내보내기
const useServerLogger = {
  info: (message: string) => asyncLog(serverLogger, 'info', message),
  warn: (message: string) => asyncLog(serverLogger, 'warn', message),
  error: (message: string) => asyncLog(serverLogger, 'error', message),
  debug: (message: string) => asyncLog(serverLogger, 'debug', message),
  verbose: (message: string) => asyncLog(serverLogger, 'verbose', message),
  silly: (message: string) => asyncLog(serverLogger, 'silly', message),
};

const useClientToServerLogger = {
  info: (message: string) => asyncLog(clientLogger, 'info', message),
  warn: (message: string) => asyncLog(clientLogger, 'warn', message),
  error: (message: string) => asyncLog(clientLogger, 'error', message),
  debug: (message: string) => asyncLog(clientLogger, 'debug', message),
  verbose: (message: string) => asyncLog(clientLogger, 'verbose', message),
  silly: (message: string) => asyncLog(clientLogger, 'silly', message),
};

export { useServerLogger, useClientToServerLogger };
