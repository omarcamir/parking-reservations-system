type PlaceholdersProps = {
  component: React.ComponentType;
  count: number;
}

export default function Placeholders({ component: Component, count }: PlaceholdersProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Component key={i} />
      ))}
    </>
  );
}
