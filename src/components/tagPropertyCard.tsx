import { TagItemType } from "@/types/propert-type";

type TagPropsType = {
  tag: TagItemType;
  toggleTag: (id: number, isChecked: boolean) => void;
};
const TagPropertyCard = ({ toggleTag, tag }: TagPropsType) => {
  return (
    <div className="flex justify-between items-center w-fit text-lg rounded-[10px] p-2 bg-blue-600 text-white gap-x-2">
      <input
        onChange={(e) => toggleTag(tag.id, e.target.checked)}
        type="checkbox"
        id={tag.name + 12}
      />
      <label htmlFor={tag.name + 12} className="line-clamp-1" title={tag.name}>
        {tag.name}
      </label>
    </div>
  );
};
export default TagPropertyCard;
