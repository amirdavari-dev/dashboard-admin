import { LandType } from "@/types/addPropertyType";
type FeatureProps = {
  landscape: LandType;
  toggleLandscape: (id: number, isChecked: boolean) => void;
};
const LandscapeCard = ({ landscape, toggleLandscape }: FeatureProps) => {
  return (
    <div className="flex justify-between items-center w-fit text-lg rounded-[10px] p-2 bg-blue-600 text-white gap-x-2">
      <input
        onChange={(e) => toggleLandscape(landscape.id, e.target.checked)}
        type="checkbox"
        id={landscape.name + 13}
      />
      <label
        htmlFor={landscape.name + 13}
        className="line-clamp-1"
        title={landscape.name}
      >
        {landscape.name}
      </label>
    </div>
  );
};
export default LandscapeCard;
