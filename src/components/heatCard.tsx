import { HeatType } from "@/types/addPropertyType";
type FeatureProps = {
  heat: HeatType;
  toggleHeat: (id: number, isChecked: boolean) => void;
};
const HeatCard = ({ heat, toggleHeat }: FeatureProps) => {
  return (
    <div className="flex justify-between items-center w-fit text-lg rounded-[10px] p-2 bg-blue-600 text-white gap-x-2">
      <input
        onChange={(e) => toggleHeat(heat.id, e.target.checked)}
        type="checkbox"
        id={heat.name + 14}
      />
      <label
        htmlFor={heat.name + 14}
        className="line-clamp-1 cursor-help"
        title={heat.name}
      >
        {heat.name}
      </label>
    </div>
  );
};
export default HeatCard;
