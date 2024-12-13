import { useAppContext } from "@/contexts/app/app-context";
import { useTranslation } from "react-i18next";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import vecprop from "@/assets/images/vecprop.png";
import { Suspense } from "react";
import Property from "@/features/properties/property";
import { GetRealEstatesType, PropItemType } from "@/types/addPropertyType";
import Sppiner from "@/components/sppiner";
const Properties = () => {
  const { showSidebar } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const loaderData = useLoaderData() as GetRealEstatesType;
  console.log(loaderData);

  return (
    <div>
      <div className="p-2 relative">
        <div className="flex justify-between items-center mb-5 mt-2">
          <button
            onClick={() => navigate("/add-property")}
            className="bg-blue-600 text-white px-3 py-2 hover:bg-white border border-blue-600 hover:text-blue-600 text-sm rounded-md font-semibold hover:scale-105 transition-all z-20"
          >
            {t("properties.mainData.addProperty")}
          </button>
        </div>
        <Suspense fallback={<Sppiner />}>
          <div
            className={`${
              showSidebar
                ? "lg:justify-start justify-center"
                : "lg:justify-start justify-center"
            } flex items-center flex-wrap gap-3 gap-y-8`}
          >
            <Await resolve={loaderData.realEstates}>
              {(realEstates) => (
                <>
                  {realEstates.map(
                    ({
                      area,
                      bathroom,
                      bed_room,
                      id,
                      images,
                      location,
                      metrage,
                      price,
                      title,
                      type,
                    } : PropItemType) => (
                      <Property
                        key={id}
                        baths={bathroom}
                        beds={bed_room}
                        images={images}
                        location={location}
                        metrage={metrage}
                        price={price.toString()}
                        title={title}
                        type={type}
                        area={area}
                        id={id}
                      />
                    )
                  )}
                </>
              )}
            </Await>
          </div>
        </Suspense>
        {!loaderData && (
          <div className="w-full mt-10">
            <div className="flex justify-center items-center">
              <img className="w-[400px] h-[300px]" src={vecprop} alt="" />
            </div>
            <h1 className="font-black text-lg text-center text-blue-600">
              {t("properties.mainData.showAlert")}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
// export const PropertiesLoader = async () => {
//   return defer({
//     Properties: loadProperties(),
//   });
// };
// export const loadProperties = async () => {
//   const response = await httpInterceptedService.get("/Course/list");
//   return response.data;
// };
export default Properties;
