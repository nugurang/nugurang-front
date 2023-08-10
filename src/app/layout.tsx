import '@/styles/global.css';
import AuthSessionProvider from "@/providers/AuthSessionProvider";

// FontAwesomeIcon
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body
        className={[
          'h-screen',
          'bg-slate-50', 'dark:bg-slate-950',
          'text-slate-950', 'dark:text-slate-50',
        ].join(' ')}
      >
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
