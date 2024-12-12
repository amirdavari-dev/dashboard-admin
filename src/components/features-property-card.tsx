import { FeatureItem } from "@/types/propert-type";
type FeatureProps = {
  feature: FeatureItem;
  toggleFeature: (id: number, isChecked: boolean) => void;
};
const FeaturesPropertyCard = ({ feature, toggleFeature }: FeatureProps) => {
  return (
    <div className="flex justify-between items-center w-fit text-lg rounded-[10px] p-2 bg-blue-600 text-white gap-x-2">
      <input
        onChange={(e) => toggleFeature(feature.id, e.target.checked)}
        type="checkbox"
        id={feature.name + 18}
      />
      <label
        htmlFor={feature.name + 18}
        className="line-clamp-1"
        title={feature.name}
      >
        {feature.name}
      </label>
    </div>
  );
};
export default FeaturesPropertyCard;
