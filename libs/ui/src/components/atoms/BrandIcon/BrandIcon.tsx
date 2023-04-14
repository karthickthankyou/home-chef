export interface IBrandIconProps {
  className?: string
  animate?: boolean
  shadow?: boolean
  height?: number
  width?: number
}

export const BrandIcon = ({
  className,
  animate = false,
  shadow = false,
  width = 24,
  height = 24,
}: IBrandIconProps) => {
  const animationClass = animate ? 'animate-wiggle-fade' : 'hidden'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} ${
        shadow ? 'shadow-lg bg-white rounded shadow-black/40' : ''
      }  `}
    >
      <path
        className={`${animate ? 'fill-black/50' : ''}`}
        d="M4 11h16a1 1 0 0 1 1 1v.5c0 1.5 -2.517 5.573 -4 6.5v1a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-1c-1.687 -1.054 -4 -5 -4 -6.5v-.5a1 1 0 0 1 1 -1z"
      ></path>
      <path
        className={`${animationClass} `}
        d="M12 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"
      ></path>
      <path
        className={`${animationClass} `}
        d="M16 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"
      ></path>
      <path
        className={`${animationClass} `}
        d="M8 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"
      ></path>
    </svg>
  )
}
