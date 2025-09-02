import { IconProps } from "@/app/types/IconProps";

const CopyIcon = ({size=32, className = "text-main-color",  onClick}:IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    height={size}
    width={size}
    fill="currentcolor"
    data-name="Layer 1"
    viewBox="0 0 32 32"
    className={className}
    onClick={onClick}
  >
    <g id="SVGRepo_iconCarrier">
      <path d="M27.2 8.22h-3.42v-2.8A3.42 3.42 0 0 0 20.36 2H5.42A3.42 3.42 0 0 0 2 5.42v14.94a3.43 3.43 0 0 0 3.42 3.42h2.8v3.42A2.81 2.81 0 0 0 11 30h16.2a2.81 2.81 0 0 0 2.8-2.8V11a2.81 2.81 0 0 0-2.8-2.78M5.42 21.91a1.55 1.55 0 0 1-1.55-1.55V5.42a1.54 1.54 0 0 1 1.55-1.55h14.94a1.55 1.55 0 0 1 1.55 1.55v2.8H11A2.81 2.81 0 0 0 8.22 11v10.91Zm22.71 5.29a.93.93 0 0 1-.93.93H11a.93.93 0 0 1-.93-.93V11a.93.93 0 0 1 .93-.93h16.2a.93.93 0 0 1 .93.93Z"></path>
    </g>
  </svg>
);

export default CopyIcon;
