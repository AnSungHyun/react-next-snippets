import { Container } from '@mui/material'
import { headers } from 'next/headers'
import ClientMessage from '@/app/(pages)/snippets/36/ClientMessage';
import ClientChildrenComponent from '@/app/_component/ClientChildrenComponent';
import ServerMessage from '@/app/(pages)/snippets/36/ServerMessage';
import LocaleSwitcher from './LocaleSwitcher';
import ResultBlock from '@/app/_component/CodeResultBlock';
import CodeBlock from '@/app/_component/CodeBlock';

export default async function LocalizationPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || 'ko';
  const lang = acceptLanguage.startsWith('ko') ? 'ko' : 'en';

  return (
    <Container>
      <p>
        - next-intl을 사용하여 국제화로 언어 설정을 변경하는 예시 프로그램
      </p>
      <p>
        - next-intl이 다른 라이브러리에 비해 설정이 간단하며, with Routing, witout Routing 방식 모두 지원
      </p>
      <p>
        - Server, Client 각 사용법이 다르니 참고하여 구현
      </p>
      <ResultBlock>
      <LocaleSwitcher />
      <ClientMessage />
      <ClientChildrenComponent>
        <ServerMessage />
      </ClientChildrenComponent>
      </ResultBlock>
      <CodeBlock filename={"ClientMessage.tsx"} value={
        "import {useTranslations} from 'next-intl';\n" +
        "\n" +
        "export default function ClientMessage() {\n" +
        "  const t = useTranslations();\n" +
        "  return <h1>클라이언트 컴포넌트 : {t('buttons.changeLanguage')}</h1>;\n" +
        "}"
      } />
      <CodeBlock filename={"ServerMessage.tsx"} value={
        "import {getTranslations} from 'next-intl/server';\n" +
        "\n" +
        "export default async function ServerMessage() {\n" +
        "  const t = await getTranslations();\n" +
        "  return <h1>서버 컴포넌트 : {t('buttons.changeLanguage')}</h1>;\n" +
        "}"
      } />
      <CodeBlock filename={"/messages/ko.json"} value={
        "{\n" +
        "  \"welcome\": \"환영합니다\",\n" +
        "  \"description\": \"이것은 다국어 지원 예시입니다\",\n" +
        "  \"buttons\": {\n" +
        "    \"changeLanguage\": \"언어 변경\",\n" +
        "    \"korean\": \"한국어\",\n" +
        "    \"english\": \"영어\"\n" +
        "  },\n" +
        "  \"clientComponent\": \"클라이언트 컴포넌트\",\n" +
        "  \"serverComponent\": {\n" +
        "    \"title\": \"서버 컴포넌트\",\n" +
        "    \"message\": \"이 메시지는 서버에서 생성되었습니다\",\n" +
        "    \"currentTime\": \"현재 서버 시간: {{time}}\"\n" +
        "  },\n" +
        "  \"count\": \"현재 카운트: {{count}}\",\n" +
        "  \"LocaleSwitcher\": {\n" +
        "    \"ko\": \"한국어\",\n" +
        "    \"en\": \"영어\",\n" +
        "    \"label\": \"언어\"\n" +
        "  }\n" +
        "}"
      } />
    </Container>
  )
}