import { SiteShell, buildMetadata } from '../../site';

export const metadata = buildMetadata('en');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
