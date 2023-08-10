export interface LoadingIconProps {
  className?: string
}

export default function LoadingIcon({
  className = '',
}: LoadingIconProps) {

  return (
    <div className={[
      'relative',
      className,
    ].join(' ')} >
      <div className={[
        'absolute', 'bg-neutral-500', 'rounded-full', 'animate-[pulse_1s_infinite_100ms]',
        'h-[16%]', 'w-[16%]', 'top-[42%]', 'left-[16%]',
      ].join(' ')} />
      <div className={[
        'absolute', 'bg-neutral-500', 'rounded-full', 'animate-[pulse_1s_infinite_300ms]',
        'h-[16%]', 'w-[16%]', 'top-[42%]', 'left-[42%]',
      ].join(' ')} />
      <div className={[
        'absolute', 'bg-neutral-500', 'rounded-full', 'animate-[pulse_1s_infinite_500ms]',
        'h-[16%]', 'w-[16%]', 'top-[42%]', 'left-[68%]',
      ].join(' ')} />
    </div>
  );
}
