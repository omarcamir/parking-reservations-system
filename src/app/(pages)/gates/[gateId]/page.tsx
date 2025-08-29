import GateDetailsHeader from "@/app/components/organisms/GateDetails/GateDetailsHeader";
import { fetchPublicGates } from "@/app/lib/api/Gate/fetchPublicGates";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    gateId: string;
  };
}

const GateDetails = async ({ params }: PageProps) => {
  const gates = await fetchPublicGates();
  const gateDetails = gates.find((gate) => gate.id === params.gateId);

  // console.log("gate:", gateDetails);
  if (!gateDetails) {
    notFound(); // Optional: Handle missing gate
  }
  return (
    <div className="container py-10">
      <GateDetailsHeader gateId={params.gateId} gateDetails={gateDetails} />
    </div>
  );
};

export default GateDetails;
