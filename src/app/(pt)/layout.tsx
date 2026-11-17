import { SiteShell, buildMetadata } from '../site';

export const metadata = buildMetadata('pt');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="pt">{children}</SiteShell>;
}
