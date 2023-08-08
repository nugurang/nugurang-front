import Box from "@/components/Box";

export interface PageRowProps {
  children: React.ReactNode
  limitWidth?: boolean
  marginTop?: boolean
  className?: string
}

export default function PageRow({
  children,
  limitWidth = true,
  marginTop = true,
  className = '',
}: PageRowProps) {
  return (
    <Box
      className={[
        'mx-auto',
        limitWidth ? 'max-w-screen-sm' : '',
        'mt-4', 'last:mb-4', !limitWidth ? 'first:mt-0' : '',
        className,
      ].join(' ')}
      paddingTop={false}
      paddingBottom={false}
      paddingLeft={false}
      paddingRight={false}
    >
      {children}
    </Box>
  );
}
