interface BadgeProps {
  text: string;
  colorIndex?: number;
}

const badgeColors = [
  "bg-green-200 text-green-800",
  "bg-blue-200 text-blue-800",
  "bg-purple-200 text-purple-800",
  "bg-yellow-200 text-yellow-800",
  "bg-pink-200 text-pink-800",
  "bg-indigo-200 text-indigo-800",
];

const Badge: React.FC<BadgeProps> = ({ text, colorIndex = 0 }) => {
  const colorClass = badgeColors[colorIndex % badgeColors.length];

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`}
    >
      {text}
    </span>
  );
};

export default Badge;
