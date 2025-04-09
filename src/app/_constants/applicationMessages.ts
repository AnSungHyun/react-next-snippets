/**
 * @description 공통 메세지
 * useLogger.info(APPLICATION_MESSAGES.LOGIN_FAILED);
 * useLogger.info(getFormatMessage(APPLICATION_MESSAGES.PASSWORD_TOO_SHORT, String(10)));
 * // 예상 출력
 * 로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.
 * 비밀번호는 최소 10자 이상이어야 합니다.
 * // 로그 파일 일별로 롤링됨
 * applicationMessage.ts 에서 메세지 관리
 * messageUtils.ts 에서 파라미터를 활용한 메세지 생성
 */
export const APPLICATION_MESSAGES = {
  REQUIRED_FIELD: '필수 입력란입니다.',
  INVALID_EMAIL: '유효하지 않은 이메일 주소입니다.',
  PASSWORD_TOO_SHORT: '비밀번호는 최소 {0}자 이상이어야 합니다.',
  LOGIN_FAILED: '로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.',
  PRODUCT_NOT_FOUND: '상품을 찾을 수 없습니다.',
};