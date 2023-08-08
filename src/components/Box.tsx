export interface BoxProps {
  children: React.ReactNode
  paddingTop?: boolean
  paddingBottom?: boolean
  paddingLeft?: boolean
  paddingRight?: boolean
  extraPadding?: boolean
  className?: string
}

export default function Box({
  children,
  paddingTop = true,
  paddingBottom = true,
  paddingLeft = true,
  paddingRight = true,
  extraPadding = false,
  className = '',
}: BoxProps) {
  return (
    <div
      className={[
        'relative',
        (paddingTop && extraPadding ? 'pt-4' : ''),
        (paddingBottom && extraPadding ? 'pb-4' : ''),
        (paddingLeft && extraPadding ? 'pl-4' : ''),
        (paddingRight && extraPadding ? 'pr-4' : ''),
        (paddingTop && !extraPadding ? 'pt-2' : ''),
        (paddingBottom && !extraPadding ? 'pb-2' : ''),
        (paddingLeft && !extraPadding ? 'pl-2' : ''),
        (paddingRight && !extraPadding ? 'pr-2' : ''),
        'rounded-3xl',
        className
      ].join(' ')}
    >
      {children}
    </div>
  );
}
