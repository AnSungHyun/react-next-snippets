'use client'

import { useTranslation } from 'react-i18next'
import { useState, Suspense } from 'react'
import { Box, Button, Typography, Container } from '@mui/material'
import ClientChildrenComponent from '@/app/_component/ClientChildrenComponent';
import ServerMessage from '@/app/(pages)/snippets/36/ServerMessage';
import { CircularProgress } from '@mui/material';

export default function LocalizationPage() {
  const { t, i18n } = useTranslation('translation')
  const [count, setCount] = useState(0)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('welcome')}
        </Typography>

        <Typography variant="body1">
          {t('description')}
        </Typography>

        <Box sx={{ my: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => changeLanguage('ko')}
          >
            {t('buttons.korean')}
          </Button>
          <Button
            variant="contained"
            onClick={() => changeLanguage('en')}
          >
            {t('buttons.english')}
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body1">
            {t('clientComponent')}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setCount(prev => prev + 1)}
              sx={{ mr: 2 }}
            >
              +1
            </Button>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {t('count', { count })}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}