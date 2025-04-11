"use server";

export async function ServerActionComponent(selectedEnvVar: string): Promise<string> {
  const envValue = process.env[selectedEnvVar];
  if (!envValue) {
    return `환경 변수 ${selectedEnvVar}가 설정되지 않았습니다.`;
  }

  return `선택된 환경 변수 값: ${envValue}`;
}