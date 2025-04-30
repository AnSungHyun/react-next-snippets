// utils/formatNumber.ts

/**
 * 숫자나 문자열을 3자리마다 콤마(,)로 구분하여 반환합니다.
 * BigInt와 큰 숫자도 안전하게 처리합니다.
 * @param value - 포맷팅할 숫자, 문자열 또는 BigInt
 * @param currency - 통화 기호 (예: '₩', '$' 등). 기본값은 빈 문자열
 * @param decimals - 소수점 자리수 (기본값: 0)
 * @returns 포맷팅된 문자열
 *
 * @example
 * // 일반적인 숫자
 * console.log(formatNumber(1234567));              // "1,234,567"
 *
 * // 큰 숫자 (BigInt)
 * console.log(formatNumber(BigInt('12345678901234567890')));
 * // "12,345,678,901,234,567,890"
 *
 * // 소수점이 있는 큰 숫자
 * console.log(formatNumber('12345678901234567890.123456', '₩', 2));
 * // "₩12,345,678,901,234,567,890.12"
 *
 * // 과학적 표기법
 * console.log(formatNumber('1.23e+21'));
 * // "1,230,000,000,000,000,000,000"
 *
 * // 음수 처리
 * console.log(formatNumber(-BigInt('12345678901234567890')));
 * // "-12,345,678,901,234,567,890"
 *
 */
export const formatNumber = (
  value: number | string | bigint,
  currency: string = '',
  decimals: number = 0
): string => {
  try {
    // 입력값이 undefined나 null이면 빈 문자열 반환
    if (value == null) return '';

    // BigInt인 경우 문자열로 변환
    if (typeof value === 'bigint') {
      value = value.toString();
    }

    // 숫자나 문자열을 문자열로 변환하고 공백 제거
    let stringValue = value.toString().trim();

    // 음수 부호 처리
    const isNegative = stringValue.startsWith('-');
    if (isNegative) {
      stringValue = stringValue.slice(1);
    }

    // 과학적 표기법 처리 (1e+21 같은 형식)
    if (stringValue.includes('e')) {
      const [base, exponent] = stringValue.split('e');
      const exp = parseInt(exponent);
      stringValue = BigInt(parseFloat(base) * Math.pow(10, exp)).toString();
    }

    // 소수점 처리
    let [integerPart, decimalPart = ''] = stringValue.split('.');

    // 정수 부분에 콤마 추가
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 소수점 자리수 처리
    if (decimals > 0 && decimalPart) {
      decimalPart = decimalPart.slice(0, decimals).padEnd(decimals, '0');
    } else {
      decimalPart = '';
    }

    // 결과 조합
    let result = formattedInteger;
    if (decimalPart) {
      result += '.' + decimalPart;
    }

    // 음수 부호와 통화 기호 추가
    return `${currency}${isNegative ? '-' : ''}${result}`;
  } catch (error) {
    console.error('formatNumber Error:', error);
    return value.toString();
  }
};