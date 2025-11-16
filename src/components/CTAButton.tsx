import { getTranslation, type Locale } from '../utils/i18n';

interface CTAButtonProps {
  locale: Locale;
}

export default function CTAButton({ locale }: CTAButtonProps) {
  const t = getTranslation(locale);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToContact}
      className="mt-8 px-6 py-3 bg-accent text-dark font-medium rounded-lg hover:bg-accent/90 transition-colors"
    >
      {t.hero.cta}
    </button>
  );
}
