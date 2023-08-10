import Footer, { FooterSpacer } from '@/compositions/Footer';
import Header, { HeaderSpacer } from '@/compositions/Header';

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1 className="sr-only">Hello, Next.js!</h1>
      <Header />
      <HeaderSpacer />
        <div>{children}</div>
      <FooterSpacer />
      <Footer />
    </div>
  );
}
