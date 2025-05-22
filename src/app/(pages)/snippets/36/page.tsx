import { Container } from '@mui/material'
import { headers } from 'next/headers'

export default async function LocalizationPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || 'ko';
  const lang = acceptLanguage.startsWith('ko') ? 'ko' : 'en';

  return (
    <Container maxWidth="sm">
    </Container>
  )
}