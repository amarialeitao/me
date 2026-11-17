import { SiteShell, buildMetadata } from '../../site';

export const metadata = buildMetadata('es');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="es">{children}</SiteShell>;
}
