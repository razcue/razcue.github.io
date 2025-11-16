import { getTranslation, type Locale } from '../utils/i18n';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const t = getTranslation(locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto text-center">
      <p className="text-text-secondary text-xs sm:text-sm">
        {t.footer.copyright.replace('{year}', currentYear.toString())}
      </p>
    </footer>
  );
}
