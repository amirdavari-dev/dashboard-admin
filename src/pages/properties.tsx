import { useAppContext } from "@/contexts/app/app-context";
import { useTranslation } from "react-i18next";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import vecprop from "@/assets/images/vecprop.png";
import { Suspense } from "react";
import Property from "@/features/properties/property";
import { GetRealEstatesType } from "@/types/addPropertyType";
const Properties = () => {
  const { showSidebar } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const loaderData = useLoaderData() as GetRealEstatesType;
  console.log(loaderData);

  return (
    <div>
      <div className="p-2">
        <div className="flex justify-between items-center mb-5">
          <button
            onClick={() => navigate("/add-property")}
            className="bg-blue-600 text-white p-3 hover:bg-white border border-blue-600 hover:text-blue-600 text-sm rounded-md font-semibold hover:scale-105 transition-all"
          >
            {t("properties.mainData.addProperty")}
          </button>
        </div>
        <div
          className={`flex items-center flex-wrap gap-y-10 gap-x-1 ${
            showSidebar ? "justify-center" : "justify-start"
          }`}
        >
          {/* <Property baths={2} beds={1} images={["dc"]} location="Istanbul" metrage={98} price="92.0000" title="Property In Istanbul" type="Apartment" area="Kepez" /> */}
        </div>
        <Suspense
          fallback={<p className="text-slate-500 text-sm">صبور باشید...</p>}
        >
          <Await resolve={loaderData}>
            <div></div>
            {loaderData ? (
              <div className={`${showSidebar ? "justify-start" : "justify-start"} flex  items-center flex-wrap gap-2`}>
                {loaderData.map(  
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
                  }) => {
                    return (
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
                      />
                    );
                  }
                )}
              </div>
            ) : (
              <div className="w-full mt-10">
                <div className="flex justify-center items-center">
                  <img className="w-[400px] h-[300px]" src={vecprop} alt="" />
                </div>
                <h1 className="font-black text-lg text-center text-blue-600">
                  {t("properties.mainData.showAlert")}
                </h1>
              </div>
            )}
          </Await>
        </Suspense>
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