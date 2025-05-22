import { Container } from '@mui/material'
import { headers } from 'next/headers'
import ClientMessage from '@/app/(pages)/snippets/36/ClientMessage';
import ClientChildrenComponent from '@/app/_component/ClientChildrenComponent';
import ServerMessage from '@/app/(pages)/snippets/36/ServerMessage';

export default async function LocalizationPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || 'ko';
  const lang = acceptLanguage.startsWith('ko') ? 'ko' : 'en';

  return (
    <Container maxWidth="sm">
      <ClientMessage />
      <ClientChildrenComponent>
        <ServerMessage />
      </ClientChildrenComponent>
    </Container>
  )
}