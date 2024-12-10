import prop from "@/assets/images/prop.png";
import AlertValidation from "@/components/alertValidation";
import FeaturesPropertyCard from "@/components/features-property-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { httpService } from "@/core/http-service";
import ImageCard from "@/features/properties/imgCard";
import { AddPropertyDataType, FormData } from "@/types/addPropertyType";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa6";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProperty = () => {
  const { locs, types, tags, features } =
    useLoaderData() as AddPropertyDataType;
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();
  const locale = localStorage.getItem("language");
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
  const [areaList, setAreaList] = useState<
    {
      id: number;
      area_name: string;
      area_key: string;
    }[]
  >([]);
  const [locationValue, setLocationValue] = useState<string | 0>(0);
  const [areaValue, setAreaValue] = useState<string | 0>(0);
  const [typeValue, setTypeValue] = useState<string | 0>(0);
  const [tagValue, setTagValue] = useState<string | 0>(0);
  const [images, setImages] = useState<
    { id: string; image: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const getAreaList = async (locationId: number | undefined) => {
    if (!locationId) {
      return;
    } else {
      try {
        const response = await httpService.get(
          `/real-estates/areas/${locationId}/${locale}`
        );
        if (response.status === 200) {
          setAreaList(response.data);
        } else if (response.status === 404) {
          setAreaList([]);
        }
      } catch (err) {
        setAreaList([]);
      }
    }
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const keyImg = `${file.lastModified}-${file.size}`;
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImages([
            ...images,
            { id: keyImg, image: reader.result.toString(), name: file.name },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleDelete = (id: string) => {
    setImages((imgs) => imgs.filter((img) => img.id !== id));
  };
  const toggleFeature = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedFeatures((prev) => [...prev, id]);
    } else {
      setSelectedFeatures((prev) =>
        prev.filter((featureId) => featureId !== id)
      );
    }
  };
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    const currentData = {
      ...data,
      images: images.map(({ id, ...img }) => img),
      locationValue,
      areaValue,
      typeValue,
      features: selectedFeatures,
      tagValue,
    };
    const response = httpService.post(`/dashboard/create/${locale}`, {
      title: currentData.title,
      price: currentData.price,
      location: currentData.locationValue,
      area: currentData.areaValue,
      baths: currentData.baths,
      beds: currentData.beds,
      sqt: currentData.sqt,
      distToShop: currentData.distShop,
      distToAirport: currentData.distAirport,
      distToHospital: currentData.distHospital,
      type: currentData.typeValue,
      details: currentData.description,
      buyMedia: currentData.buyPropertyLink,
      availableMedia: currentData.availablePropertyLink,
      download: currentData.brochureLink,
      imagesArr: currentData.images,
      tag: currentData.tagValue,
      featuresArr: currentData.features,
    });
    toast.promise(
      response,
      {
        pending: t("properties.crudProperty.submitPending"),
        success: {
          render() {
            setTimeout(() => {
              navigate("/");
            }, 2000);
            setLoading(false);
            return t("properties.crudProperty.isInsert");
          },
        },
        error: {
          render({ data }: any) {
            console.log(data);
            setLoading(false);
            return t("properties.crudProperty.isError");
          },
        },
      },
      {
        position: "top-center",
      }
    );
    // if (response.status === 200) {
    //   toast.success("Insert Is Successfully");
    //   setTimeout(() => {
    //     return navigate("/");
    //   }, 3000);
    // } else {
    //   toast.success("Send has a problem");
    // }
  };
  // const routeErrors: any = useRouteError();
  // console.log(routeErrors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center items-center">
        <div className="my-10 w-[500px]">
          <div className="flex justify-center items-center">
            <div className="w-[360px] h-[200px] rounded-lg overflow-hidden">
              <img
                className="w-full h-full"
                src={images.length >= 1 ? images[0].image : prop}
                alt=""
              />
            </div>
          </div>
          <div className="flex mt-4 justify-start items-center gap-x-3 flex-nowrap whitespace-nowrap overflow-x-scroll">
            <div className="bg-blue-600 flex justify-center items-center w-[80px] min-w-[80px] max-w-[80px] h-[80px] rounded-md overflow-hidden">
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/jpeg"
                onChange={handleFileChange}
              />
              <label
                htmlFor="image-upload"
                className="w-full h-full flex justify-center items-center dark:text-white"
              >
                <FaPlus className="text-white" size={18} />
              </label>
            </div>
            {images.map((imageImg) => {
              return (
                <ImageCard
                  imgId={imageImg.id}
                  handleDelete={handleDelete}
                  key={imageImg.id}
                  src={imageImg.image}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5 mb-5 px-4">
        <div className="col-span-4">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.title")}:
          </label>
          <br />
          <input
            {...register("title", {
              required: true,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            type="text"
          />
          {errors.title && errors.title.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.titleReqError")}
            </AlertValidation>
          )}
        </div>
        <div className="col-span-4">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.location")}:
          </label>
          <br />
          <Select
            onValueChange={(value) => {
              setLocationValue(value);
              const locKey = locs.find((loc) => loc.location_key === value);
              getAreaList(locKey?.id);
            }}
          >
            <SelectTrigger className="w-full mt-3">
              {locationValue === 0
                ? `${t("properties.crudProperty.location")}`
                : locationValue.toUpperCase()}
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectLabel>Select Location</SelectLabel>
                {locs.map((loc) => {
                  return (
                    <SelectItem key={loc.id} value={loc.location_key}>
                      {loc.location_name.toUpperCase()}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {locationValue !== 0 && (
          <div className="col-span-4">
            <label className="dark:text-white" htmlFor="">
              {t("properties.crudProperty.area")}:
            </label>
            <br />
            <Select onValueChange={(value) => setAreaValue(value)}>
              <SelectTrigger className="w-full mt-3">
                {areaValue === 0
                  ? `${t("properties.crudProperty.area")}`
                  : areaValue.toUpperCase()}
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>Select Area</SelectLabel>
                  {areaList.length === 0 ? (
                    <SelectItem value="0">
                      Not Found Area For This Location
                    </SelectItem>
                  ) : (
                    areaList.map((area) => {
                      return (
                        <SelectItem key={area.id} value={area.area_key}>
                          {area.area_name.toUpperCase()}
                        </SelectItem>
                      );
                    })
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="col-span-4">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.price")}:
          </label>
          <br />
          <input
            {...register("price", {
              required: true,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            type="text"
          />
          {errors.price && errors.price.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.priceReqError")}
            </AlertValidation>
          )}
        </div>
        <div className="col-span-4">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.baths")}:
          </label>
          <br />
          <input
            {...register("baths", {
              required: true,
              maxLength: 5,
              minLength: 1,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            type="text"
          />
          {errors.baths && errors.baths.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.bathsReqError")}
            </AlertValidation>
          )}
          {errors.baths &&
            (errors.baths.type === "maxLength" ||
              errors.baths.type === "minLength") && (
              <AlertValidation>
                {t("properties.submitForms.addProperty.bathsLengthError")}
              </AlertValidation>
            )}
        </div>
        <div className="col-span-4">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.beds")}:
          </label>
          <br />
          <input
            {...register("beds", {
              required: true,
              maxLength: 5,
              minLength: 1,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            type="text"
          />
          {errors.beds && errors.beds.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.bedsReqError")}
            </AlertValidation>
          )}
          {errors.beds &&
            (errors.beds.type === "maxLength" ||
              errors.beds.type === "minLength") && (
              <AlertValidation>
                {t("properties.submitForms.addProperty.bedsLengthError")}
              </AlertValidation>
            )}
        </div>
        <div className="col-span-4">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.sqt")}:
          </label>
          <br />
          <input
            {...register("sqt", {
              required: true,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            type="text"
          />
          {errors.sqt && errors.sqt.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.sqtReqError")}
            </AlertValidation>
          )}
        </div>
        <div className="col-span-4">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.type")}:
          </label>
          <br />
          <Select
            onValueChange={(value) => {
              setTypeValue(value);
            }}
          >
            <SelectTrigger className="w-full mt-3">
              {typeValue === 0
                ? `${t("properties.crudProperty.type")}`
                : typeValue.toUpperCase()}
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectLabel>Select Type</SelectLabel>
                {types.map((type) => {
                  return (
                    <SelectItem key={type.id} value={type.name}>
                      {type.name.toUpperCase()}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* tags */}
        <div className="col-span-4">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.tag")}:
          </label>
          <br />
          <Select
            onValueChange={(value) => {
              setTagValue(value);
            }}
          >
            <SelectTrigger className="w-full mt-3">
              {tagValue === 0
                ? `${t("properties.crudProperty.tag")}`
                : tagValue.toUpperCase()}
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectLabel>Select Tag</SelectLabel>
                {tags.map((tag) => {
                  return (
                    <SelectItem key={tag.id} value={tag.tag_key}>
                      {tag.name.toUpperCase()}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-4">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.distance.shop")}:
          </label>
          <br />
          <input
            {...register("distShop", {
              required: true,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            type="text"
          />
          {errors.distShop && errors.distShop.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.distanceReqError")}
            </AlertValidation>
          )}
        </div>
        <div className="col-span-4">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.distance.airport")}:
          </label>
          <br />
          <input
            {...register("distAirport", {
              required: true,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            type="text"
          />
          {errors.distAirport && errors.distAirport.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.distanceReqError")}
            </AlertValidation>
          )}
        </div>
        <div className="col-span-4">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.distance.hospital")}:
          </label>
          <br />
          <input
            {...register("distHospital", {
              required: true,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            type="text"
          />
          {errors.distHospital && errors.distHospital.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.distanceReqError")}
            </AlertValidation>
          )}
        </div>
        <div className="col-span-4">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.attachment.download")}:
          </label>
          <br />
          <input
            {...register("brochureLink", {
              required: true,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            type="text"
          />
        </div>
        <div className="col-span-4">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.buyVideo")}:
          </label>
          <br />
          <input
            {...register("buyPropertyLink", {
              required: true,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            type="text"
          />
        </div>
        <div className="col-span-4">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.availability")}:
          </label>
          <br />
          <input
            {...register("availablePropertyLink", {
              required: true,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            type="text"
          />
        </div>
        <div className="col-span-12">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.detailsDesc")}:
          </label>
          <br />
          <textarea
            {...register("description", {
              required: true,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            rows={5}
            cols={3}
          ></textarea>
          {errors.description && errors.description.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.descReqError")}
            </AlertValidation>
          )}
        </div>
        <div className="overflow-x-scroll col-span-12 flex flex-nowrap whitespace-nowrap justify-start items-center gap-x-3 p-3">
          {features.map((feature) => {
            return (
              <FeaturesPropertyCard
                key={feature.id}
                feature={feature}
                toggleFeature={toggleFeature}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center mb-10">
        <button
          disabled={loading}
          className="bg-blue-600 text-white rounded-md overflow-hidden py-2 px-5 "
          type="submit"
        >
          {loading
            ? t("properties.crudProperty.submitPending")
            : t("properties.crudProperty.submitSend")}
        </button>
      </div>
    </form>
  );
};
export default AddProperty;
// export const insertProperty = async ({ request }: RegisterAction) => {
//   const locale = localStorage.getItem("language");
//   const formData = await request.FormData();
//   const data = Object.fromEntries(formData);
//   console.log(data);
//   const response = await httpService.post(`/dashboard/create/${locale}`, {
//     title: data.title,
//     price: data.price,
//     location: data.locationValue,
//     area: data.areaValue,
//     baths: data.area,
//     beds: data.beds,
//     sqt: data.sqt,
//     distToShop: data.distShop,
//     distToAirport: data.distAirport,
//     distToHospital: data.distHospital,
//     type: data.typeValue,
//     details: data.description,
//     buyMedia: data.buyPropertyLink,
//     availableMedia: data.availablePropertyLink,
//     download: data.brochureLink,
//     imagesArr: data.images,
//     tag: data.tagValue,
//     featuresArr: data.features,
//   });
//   if (response.status === 200) {
//     toast.success("Insert Is Successfully");
//     return redirect("/");
//   }
// };
