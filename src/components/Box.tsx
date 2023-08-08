export interface BoxProps {
  children: React.ReactNode
  paddingTop?: boolean
  paddingBottom?: boolean
  paddingLeft?: boolean
  paddingRight?: boolean
  className?: string
}

export default function Box({
  children,
  paddingTop = true,
  paddingBottom = true,
  paddingLeft = true,
  paddingRight = true,
  className = '',
}: BoxProps) {
  return (
    <div
      className={[
        'relative',
        (paddingTop ? 'pt-2' : ''),
        (paddingBottom ? 'pb-2' : ''),
        (paddingLeft ? 'pl-2' : ''),
        (paddingRight ? 'pr-2' : ''),
        'rounded-2xl',
        className
      ].join(' ')}
    >
      {children}
    </div>
  );
}
