import { IconProps } from "./typing"

export function LiveIcon({ className, width = 14, height = 14 }: IconProps) {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle opacity={0.2} cx={7} cy={7} r={7} fill="#00E150" />
      <circle opacity={0.3} cx={7.00065} cy={7.00065} r={4.66667} fill="#00E150" />
      <circle cx={6.99935} cy={6.99935} r={2.33333} fill="#00E150" />
    </svg>
  )
}
