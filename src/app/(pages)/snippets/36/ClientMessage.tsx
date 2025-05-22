import {useTranslations} from 'next-intl';

export default function ClientMessage() {
  const t = useTranslations();
  return <h1>클라이언트 컴포넌트 : {t('buttons.changeLanguage')}</h1>;
}