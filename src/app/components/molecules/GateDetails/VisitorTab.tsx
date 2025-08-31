import { ZoneProps } from "@/app/types/ZoneProps";
import ZoneCardPlaceholder from "../../Placeholders/ZoneCardPlaceholder";
import Placeholders from "../Placeholders";
import ZoneCard from "../ZoneCard";


interface VisitorTabProps {
  zones: ZoneProps[];
  isLoading: boolean;
  isFetching: boolean;
  onSelectZone: (zoneId: string, userType: 'visitor' | 'subscriber') => void;
}

const VisitorTab: React.FC<VisitorTabProps> = ({ zones, isLoading, isFetching, onSelectZone }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading || isFetching ? (
        <Placeholders component={ZoneCardPlaceholder} count={5} />
      ) : (
        zones?.map((zone) => (
          <ZoneCard
            key={zone.id}
            zone={zone}
            userType="visitor"
            onSelect={onSelectZone}
          />
        ))
      )}
    </div>
  );
};

export default VisitorTab;
