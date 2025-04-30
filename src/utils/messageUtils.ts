/**
 * 메시지 템플릿에 파라미터를 동적으로 삽입하는 유틸리티 함수
 * {0}, {1}, {2}와 같은 플레이스홀더를 파라미터로 대체합니다.
 *
 * @param message - 플레이스홀더({숫자})를 포함한 메시지 템플릿
 * @param params - 플레이스홀더를 대체할 파라미터들
 * @returns 파라미터가 삽입된 최종 메시지
 *
 * @example
 * // 기본 사용법
 * getFormatMessage("안녕하세요 {0}님", "홍길동")
 * // 결과: "안녕하세요 홍길동님"
 *
 * // 여러 파라미터 사용
 * getFormatMessage("{0}의 가격은 {1}원입니다.", "커피", "4,000")
 * // 결과: "커피의 가격은 4,000원입니다."
 *
 * // 누락된 파라미터는 플레이스홀더 그대로 유지
 * getFormatMessage("테스트 {0} {1}", "A")
 * // 결과: "테스트 A {1}"
 */

export function getFormatMessage(message: string, ...params: string[]): string {
  return message.replace(/{(\d+)}/g, (match, index) => {
    return typeof params[index] !== 'undefined' ? params[index] : match;
  });
}