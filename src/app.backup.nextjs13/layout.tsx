// import Mocks from '../mocks';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // if (process.env.NEXT_PUBLIC_APP_MODE === 'mock') {
  //   Mocks.initMockAPI();
  // }
  return (
    <html>
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}
