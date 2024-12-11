import { LuBedDouble, LuCloudRain } from "react-icons/lu";
import property from "@/assets/images/prop.png"
import { BsArrowsMove } from "react-icons/bs";
import { ImgsPropType } from "@/types/addPropertyType";
type PropertyType = {
  title: string;
  location: string;
  area?: string;
  price: string;
  baths: number;
  beds: number;
  metrage: number;
  images: ImgsPropType[];
  type: string;

};
const Property = ({
  title,
  baths,
  beds,
  images,
  location,
  metrage,
  price,
  area,
  type,
}: PropertyType) => {
  return (
    <div
      className="rounded-[10px] w-[360px] border border-sky-200 overflow-hidden group bg-white h-[405px] min-h-[405px] max-h-[405px]"
    >
      <div className="h-[200px] min-h-[200px] max-h-[200px]relative">
        <div className="absolute top-0 left-0 flex justify-between items-center z-10 w-full p-3 text-[11px] s1900:text-[12px]">
          <div>
            <p className="h-[25px] w-[72px] s1900:w-[89px] flex justify-center items-center rounded-[10px] p-2 bg-[#2E5A9080]/50 backdrop-blur-[10px] text-white font-normal">
              <span>{type}</span>
            </p>
          </div>
          <div>
            <p className="h-[25px] w-[72px]  flex justify-center items-center rounded-[10px] p-2 bg-[#2E5A9080]/50 backdrop-blur-[10px] text-white font-normal">
              <span>{images.length} Photo</span>
            </p>
          </div>
        </div>
        <div className="w-full h-[200px]">
            <img src={images.length >=1 ? `${import.meta.env.VITE_FILES_IMG+images[0].file_name}` : property} alt="" className="w-full h-full" />
        </div>
      </div>
      <div className="mt-1 p-4">
        <h3 className="line-clamp-2 font-semibold text-[15px] s1900:text-[20px] h-[60px]">
          {title}
        </h3>
        <div className="flex justify-start items-center gap-x-2 mt-2 text-[#939393] font-medium text-[12px] s1550:text-[17px] mb-1">
          <p>{location}</p>
          {area && " , "}
          <p>{area}</p>
        </div>
        <div>
          <p className="font-medium text-[12px] s1550:text-[20px]">
            <span className="text-[#939393] mr-2">From</span>
            <span className="text-[#2E5A90]">{price}$</span>
          </p>
        </div>
        <div className="flex justify-start items-center gap-x-5 my-4 font-normal text-[12px] s1550:text-[16px]">
          <div className="flex justify-center items-center gap-x-1">
            <span className="text-[#2E5A90]">
              <LuCloudRain size={18} />
            </span>
            <span>Baths: {baths}</span>
          </div>
          <div className="h-[28px] border border-[#2E5A90] opacity-70"></div>
          <div className="flex justify-center items-center gap-x-1">
            <span className="text-[#2E5A90]">
              <LuBedDouble size={18} />
            </span>
            <span>Bed: {beds}</span>
          </div>
          <div className="h-[28px] border border-[#2E5A90] opacity-70"></div>
          <div className="flex justify-center items-center gap-x-1">
            <span className="text-[#2E5A90]">
              <BsArrowsMove size={18} />
            </span>
            <span>{metrage} sqm</span>
          </div>
        </div>
        {/* <div className="px-2 mt-1 flex justify-between items-center">
          <Link to="/">View</Link>
          <Link to="/property-edit/3">Edit</Link>
        </div> */}
      </div>
    </div>
  );
};
export default Property;
