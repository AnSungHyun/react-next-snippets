import { useTranslation } from '@/app/i18n/server';

export default async function ServerMessage({ lang }: { lang: string }) {
  const { t } = await useTranslation(lang, 'translation');
  console.log('logging from server component', lang);

  return (
    <div className="p-4 my-4 bg-gray-100 rounded">
      <h3 className="font-bold">{t('serverComponent.title')}</h3>
      <p>{t('buttons.changeLanguage')}</p>
      <p>
        {t('serverComponent.currentTime', {
          time: new Date().toLocaleString(lang),
        })}
      </p>
    </div>
  );
}
