import { IconProps } from "@/app/types/IconProps";

const PasteIcon = ({
  size = 32,
  className = "text-main-color",
  onClick,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className={className}
    height={size}
    width={size}
    onClick={onClick}
  >
    <path
      id="SVGRepo_iconCarrier"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.778 5h.889c.838 0 1.257 0 1.517.264.26.263.26.687.26 1.536V10m-2.666-5v.8c0 .424 0 .636-.13.768s-.34.132-.76.132H7.557c-.42 0-.629 0-.76-.132-.13-.132-.13-.344-.13-.768V5m7.112 0c0-.424 0-.736-.13-.868S13.308 4 12.888 4H7.557c-.42 0-.629 0-.76.132-.13.132-.13.444-.13.868m0 0h-.888C4.94 5 4.52 5 4.26 5.264 4 5.527 4 5.95 4 6.8v10.396c0 .848 0 1.273.26 1.536s.68.264 1.518.264h4M14 20h4c.943 0 1.414 0 1.707-.293S20 18.943 20 18v-4c0-.943 0-1.414-.293-1.707S18.943 12 18 12h-4c-.943 0-1.414 0-1.707.293S12 13.057 12 14v4c0 .943 0 1.414.293 1.707S13.057 20 14 20"
    ></path>
  </svg>
);

export default PasteIcon;
