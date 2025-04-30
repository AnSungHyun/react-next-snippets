// lib/dateUtils.ts
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko'; // 한국어 로케일 임포트

// 플러그인 등록
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');

// 타임존 설정
const myTimezone = 'Asia/Seoul';

/**
 * 현재 시간을 지정된 타임존 기준으로 반환하는 함수
 * UTC 시간을 기준으로 설정된 타임존(myTimezone)으로 변환하여 반환
 *
 * @returns 'YYYY-MM-DD HH:mm:ss' 형식의 날짜/시간 문자열
 *
 * @example
 * // 타임존이 'Asia/Seoul'인 경우
 * getCurrentDateTime()
 * // 결과: "2024-03-14 15:30:45"
 *
 * // 시스템 시간이 UTC 기준 06:30:45일 때
 * // 한국 시간(UTC+9)으로 변환되어 15:30:45로 표시
 *
 * @note
 * - UTC 기준 시간을 사용하여 시간대 불일치 문제 방지
 * - 서버와 클라이언트 간 시간 동기화에 유용
 * - 24시간 형식 사용 (00~23시)
 */
export const getCurrentDateTime = () => {
  return dayjs.utc().tz(myTimezone).format('YYYY-MM-DD HH:mm:ss');
};

/**
 * 현재 날짜를 반환합니다.
 * @returns {string} 현재 날짜 (YYYY-MM-DD 형식)
 *
 * 예시:
 * const currentDate = getCurrentDate();
 * console.log(`현재 날짜: ${currentDate}`); // 예: "현재 날짜: 2025-03-26"
 */
export const getCurrentDate = () => {
  return dayjs.utc().tz(myTimezone).format('YYYY-MM-DD');
};

/**
 * 특정 날짜의 요일을 반환합니다.
 * @param {string | Date} date - 요일을 알고 싶은 날짜
 * @returns {string} 요일 (예: "수요일")
 *
 * 예시:
 * const date = '2025-03-26';
 * const dayOfWeek = getDayOfWeek(date);
 * console.log(`요일: ${dayOfWeek}`); // 예: "요일: 수요일"
 */
export const getDayOfWeek = (date: string | Date) => {
  return dayjs(date).utc().tz(myTimezone).format('dddd');
};

/**
 * 특정 날짜를 지정한 형식으로 포맷팅합니다.
 * @param {string | Date} date - 포맷팅할 날짜
 * @param {string} formatStr - 날짜 형식 문자열 (예: 'YYYY/MM/DD')
 * @returns {string} 포맷팅된 날짜
 *
 * 예시:
 * const dateToFormat = '2025-03-26';
 * const formatStr = 'YYYY/MM/DD';
 * const formattedDate = formatDate(dateToFormat, formatStr);
 * console.log(`포맷된 날짜: ${formattedDate}`); // 예: "포맷된 날짜: 2025/03/26"
 */
export const formatDate = (date: string | Date, formatStr: string) => {
  return dayjs(date).utc().tz(myTimezone).format(formatStr);
};

/**
 * 특정 날짜에 주어진 일수를 더한 날짜를 반환합니다.
 * @param {string | Date} date - 기준 날짜
 * @param {number} days - 더할 일수
 * @returns {string} 새로운 날짜 (YYYY-MM-DD 형식)
 *
 * 예시:
 * const initialDate = '2025-03-26';
 * const daysToAdd = 5;
 * const newDate = addDays(initialDate, daysToAdd);
 * console.log(`새로운 날짜 (5일 추가): ${newDate}`); // 예: "새로운 날짜 (5일 추가): 2025-03-31"
 */
export const addDays = (date: string | Date, days: number) => {
  return dayjs(date).utc().tz(myTimezone).add(days, 'day').format('YYYY-MM-DD');
};

/**
 * 특정 날짜에서 주어진 일수를 뺀 날짜를 반환합니다.
 * @param {string | Date} date - 기준 날짜
 * @param {number} days - 뺄 일수
 * @returns {string} 새로운 날짜 (YYYY-MM-DD 형식)
 *
 * 예시:
 * const dateToSubtractFrom = '2025-03-26';
 * const daysToSubtract = 10;
 * const updatedDate = subtractDays(dateToSubtractFrom, daysToSubtract);
 * console.log(`새로운 날짜 (10일 빼기): ${updatedDate}`); // 예: "새로운 날짜 (10일 빼기): 2025-03-16"
 */
export const subtractDays = (date: string | Date, days: number) => {
  return dayjs(date).utc().tz(myTimezone).subtract(days, 'day').format('YYYY-MM-DD');
};

/**
 * 두 날짜 간의 차이를 일수로 계산합니다.
 * @param {string | Date} startDate - 시작 날짜
 * @param {string | Date} endDate - 종료 날짜
 * @returns {number} 두 날짜 간의 차이 (일수)
 *
 * 예시:
 * const startDate = '2025-03-01';
 * const endDate = '2025-03-26';
 * const daysDifference = differenceInDays(startDate, endDate);
 * console.log(`날짜 차이: ${daysDifference}일`); // 예: "날짜 차이: 25일"
 */
export const differenceInDays = (startDate: string | Date, endDate: string | Date) => {
  return dayjs(endDate).utc().tz(myTimezone).diff(dayjs(startDate).tz(myTimezone), 'day');
};

/**
 * 두 날짜를 비교하여 첫 번째 날짜가 두 번째 날짜보다 이전인지 확인합니다.
 * @param {string | Date} date1 - 비교할 첫 번째 날짜
 * @param {string | Date} date2 - 비교할 두 번째 날짜
 * @returns {boolean} 첫 번째 날짜가 두 번째 날짜보다 이전이면 true, 아니면 false
 *
 * 예시:
 * const date1 = '2025-03-25';
 * const date2 = '2025-03-26';
 * const result = isBefore(date1, date2);
 * console.log(`첫 번째 날짜가 두 번째 날짜보다 이전가요? ${result}`); // 예: "첫 번째 날짜가 두 번째 날짜보다 이전가요? true"
 */
export const isBefore = (date1: string | Date, date2: string | Date) => {
  return dayjs(date1).utc().tz(myTimezone).isBefore(dayjs(date2).tz(myTimezone));
};

/**
 * 주어진 날짜가 오늘인지 확인합니다.
 * @param {string | Date} date - 확인할 날짜
 * @returns {boolean} 주어진 날짜가 오늘이면 true, 아니면 false
 *
 * 예시:
 * const dateToCheck = '2025-03-26';
 * const todayCheck = isToday(dateToCheck);
 * console.log(`오늘인가요? ${todayCheck}`); // 예: "오늘인가요? true"
 */
export const isToday = (date: string | Date) => {
  return dayjs(date).utc().tz(myTimezone).isSame(dayjs().tz(myTimezone), 'day');
};