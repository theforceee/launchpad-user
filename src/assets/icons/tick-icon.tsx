import { IconProps } from "./typing"

export function TickIcon({ className, width = 10, height = 10 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.76 2.583L4.07 8.852a.932.932 0 01-1.423 0L.24 6.157a1.021 1.021 0 01.054-1.375c.383-.33.985-.33 1.368.055L3.36 6.762l4.979-5.444c.383-.385.985-.44 1.368-.055.383.33.383.99.054 1.32z"
        fill="currentColor"
      />
    </svg>
  )
}
