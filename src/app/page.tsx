import Link from "next/link";
import PageTitle from "./components/atoms/PageTitle";
import { GateCard } from "./components/molecules/GateCard";
import { fetchPublicGates } from "./lib/api/fetchPublicGates";
import { GateProps } from "./types/GateProps";

const Home = async () => {
  const gates: GateProps[] = await fetchPublicGates();

  return (
    <div className="container py-10">
      <PageTitle title="Public Gates" />
      {gates?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gates.map((gate) => (
            <Link href={`/gates/${gate.id}`} className="col-span-1" key={gate.id}>
              <GateCard gate={gate} />
            </Link>
          ))}
        </div>
      ) : (
        <p>No gates found.</p>
      )}
    </div>
  );
};

export default Home;
