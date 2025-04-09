// applicationMessage 메세지에 파라미터를 붙여주는 기능
export function getFormatMessage(message: string, ...params: string[]): string {
  return message.replace(/{(\d+)}/g, (match, index) => {
    return typeof params[index] !== 'undefined' ? params[index] : match;
  });
}