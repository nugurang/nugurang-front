import LoadingIcon from '@/components/LoadingIcon'

export interface PageLoadingIndicatorProps {
  className?: string
}

export default function PageLoadingIndicator({
  className = '',
}: PageLoadingIndicatorProps) {

  return (
    <div
      className={[
        'flex', 'justify-center', 'items-center',
        'fixed', 'top-0', 'bottom-0', 'left-0', 'right-0',
      ].join(' ')}
    >
      <div className={[
        'relative',
        'h-16', 'w-16',
        'max-h-[50%]', 'max-w-[50%]',
        'bg-neutral-200', 'dark:bg-neutral-800',
        'rounded-3xl',
        className,
      ].join(' ')}>
        <LoadingIcon className={[ 'h-16', 'w-16' ].join(' ')} />
      </div>
    </div>
  );
}
