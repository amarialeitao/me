import { LanguageProvider } from '@/contexts/LanguageContext';
import PortfolioPage from '@/components/PortfolioPage';

export default function Page() {
  return (
    <LanguageProvider initialLocale="pt" detectLocale>
      <PortfolioPage />
    </LanguageProvider>
  );
}
