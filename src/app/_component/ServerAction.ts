"use server";

export async function ServerActionComponent(selectedEnvVar: string): Promise<string> {
  const envValue = process.env[selectedEnvVar];
  if (!envValue) {
    return `환경 변수 ${selectedEnvVar}가 설정되지 않았습니다.`;
  }

  console.log(`선택된 환경 변수: ${selectedEnvVar}, 값: ${envValue}`);
  // 예제: 특정 경로를 다시 유효화
  // revalidatePath("/");

  return `선택된 환경 변수 값: ${envValue}`;
}