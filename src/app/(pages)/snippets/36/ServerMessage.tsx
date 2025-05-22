import {getTranslations} from 'next-intl/server';

export default async function ServerMessage() {
  const t = await getTranslations();
  return <h1>서버 컴포넌트 : {t('buttons.changeLanguage')}</h1>;
}