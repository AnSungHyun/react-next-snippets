import {useTranslations} from 'next-intl';

export default function ClientMessage() {
  const t = useTranslations();
  return <h1>{t('buttons.changeLanguage')}</h1>;
}