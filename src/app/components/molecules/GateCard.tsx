import { GateProps } from "@/app/types/GateProps";
import Badge from "../atoms/Badge";

interface GateCardProps {
  gate: GateProps;
}
export const GateCard: React.FC<GateCardProps> = ({ gate }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm w-full">
      <h3 className="text-main-color text-xl font-semibold mb-2">
        {gate.name}
      </h3>
      <p className="text-info-color font-medium mb-1">
        Location: <span className="text-blue-500">{gate.location}</span>
      </p>
      <div className="text-sm flex items-center gap-2">
        <span className="font-semibold text-info-color">Zones:</span>
        <div className="flex flex-wrap gap-2">
          {gate.zoneIds.map((zoneId, index) => (
            <Badge key={zoneId} text={zoneId} colorIndex={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
