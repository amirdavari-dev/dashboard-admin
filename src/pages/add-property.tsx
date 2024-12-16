import prop from "@/assets/images/prop.png";
import AlertValidation from "@/components/alertValidation";
import FeaturesPropertyCard from "@/components/features-property-card";
import HeatCard from "@/components/heatCard";
import LandscapeCard from "@/components/landscapeCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaDollarSign } from "react-icons/fa6";
import { IoLogoEuro } from "react-icons/io5";
import {
  MdOutlineCurrencyRuble,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProperty = () => {
  const { locs, types, tags, features, heating, landscapesData, typeHouses } =
    useLoaderData() as AddPropertyDataType;
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();
  const locale = localStorage.getItem("language");
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
  const [landscapes, setLanscapes] = useState<number[]>([]);
  const [heats, setHeats] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
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
  const [furnished, setFurnished] = useState<boolean | null>(null);
  const [imgCounter, setImageCounter] = useState<number>(0);
  // const [tagValue, setTagValue] = useState<string | 0>(0);
  const [images, setImages] = useState<
    { id: string; image: string; name: string; order: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [typeMoney, setTypeMoney] = useState<0 | 1 | 2>(0);
  const [money, setIsMoney] = useState<boolean>(false);
  const [minMoney, setMinMoney] = useState<string>("");
  const [maxMoney, setMaxMoney] = useState<string>("");
  const [typeUnit, setTypeUnit] = useState<number[]>([]);
  const [locationId, setLocationId] = useState<number | undefined>(undefined);
  const [bedsValue, setBedsValue] = useState("");
  useEffect(() => {
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
    getAreaList(locationId);
  }, [locationId, locale]);
  // Operation On the Data List
  // get files
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const newImages: {
      id: string;
      image: string;
      name: string;
      order: number;
    }[] = [];
    if (!files) return;
    Array.from(files).forEach((file) => {
      const keyImg = `${file.lastModified}-${file.size}`;
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          newImages.push({
            id: keyImg,
            image: reader.result.toString(),
            name: file.name,
            order: images.length + 1,
          });
          if (newImages.length === files.length) {
            setImages((prevImages) => [...prevImages, ...newImages]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleDelete = (id: string) => {
    setImages((imgs) => imgs.filter((img) => img.id !== id));
  };
  const handleShow = (img: number) => {
    setImageCounter(img);
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
  const toggleTag = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedTags((prev) => [...prev, id]);
    } else {
      setSelectedTags((prev) => prev.filter((tag) => tag !== id));
    }
  };
  const toggleHeat = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setHeats((prev) => [...prev, id]);
    } else {
      setHeats((prev) => prev.filter((heat) => heat !== id));
    }
  };
  const toggleLandscape = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setLanscapes((prev) => [...prev, id]);
    } else {
      setLanscapes((prev) => prev.filter((heat) => heat !== id));
    }
  };
  const handlePrice = (price: string, typeMoney: "min" | "max") => {
    const regex = /^\d*\.?\d*$/;
    if (regex.test(price)) {
      const text = Number(price).toLocaleString("en-US");
      typeMoney === "max" ? setMaxMoney(text) : setMinMoney(text);
    }
  };

  // Submiting
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    const typeMoneyValue = () => {
      let moneyValue: string = "dollar";
      if (typeMoney === 0) {
        moneyValue = "dollar";
      } else if (typeMoney === 1) {
        moneyValue = "ruble";
      } else {
        moneyValue = "euro";
      }
      return moneyValue;
    };
    
    const currentData = {
      ...data,
      images: images.map(({ id, ...img }) => img),
      locationValue,
      areaValue,
      typeValue,
      features: selectedFeatures,
      tagsArr: selectedTags,
      landscapes,
      heats,
      typeMoney: typeMoneyValue(),
      furnished,
      typeUnit,
      bedsValue,
    };
    const response = httpService.post(`/dashboard/create/${locale}`, {
      title: currentData.title,
      price: currentData.minPrice,
      priceMax: currentData.maxPrice ? currentData.maxPrice : null,
      priceMin: currentData.minPrice,
      location: currentData.locationValue,
      area: currentData.areaValue,
      baths: currentData.baths,
      beds: currentData.bedsValue,
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
      tagsArr: currentData.tagsArr,
      featuresArr: currentData.features,
      locationMap: currentData.mapLink,
      moneyType: currentData.typeMoney,
      buildingFloor: currentData.floor,
      ageOfTheBuilding: currentData.ageOfBuilding,
      furnishedSale: currentData.furnished ? 1 : 0,
      distToSea: currentData.distSea,
      landscapesArr: currentData.landscapes,
      heatingTypesArr: currentData.heats,
      houseTypesArr: currentData.typeUnit,
      distToShopType: currentData.shopType,
      distToAirportType: currentData.airportType,
      distToHospitalType: currentData.hospitalType,
      distToSeaType: currentData.seaType,
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
            setLoading(false);
            console.log(data);

            return t("properties.crudProperty.isError");
          },
        },
      },
      {
        position: "top-center",
      }
    );
  };
  const selectedTypesUnit = typeUnit.map((id) => {
    const selectedOption = typeHouses.find((option) => option.id === id);
    return selectedOption ? selectedOption.name : "";
  });
  const bedsList: { id: number; name: string }[] = [
    {
      id: 0,
      name: "1",
    },
    {
      id: 1,
      name: "2",
    },
    {
      id: 3,
      name: "3",
    },
    {
      id: 4,
      name: "4",
    },
    {
      id: 5,
      name: "5",
    },
    {
      id: 6,
      name: "+5",
    },
  ];
  useEffect(()=>{
    setTypeUnit([])
  },[money])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center items-center">
        <div className="my-10 grid grid-cols-12 gap-y-10 w-full">
          <div className="col-span-12 md:col-span-6">
            <div className="flex justify-center items-center">
              <div className="w-[360px] h-[200px] rounded-lg overflow-hidden">
                <img
                  className="w-full h-full"
                  src={images.length >= 1 ? images[imgCounter].image : prop}
                  alt=""
                />
              </div>
            </div>
            <div className="flex mt-4 justify-start items-center gap-x-3 flex-nowrap whitespace-nowrap overflow-x-scroll scrollbar-custom">
              {images.map((imageImg, index) => {
                return (
                  <ImageCard
                    imgId={imageImg.id}
                    handleDelete={handleDelete}
                    handleShow={handleShow}
                    counterImg={index}
                    key={imageImg.id}
                    src={imageImg.image}
                  />
                );
              })}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 flex justify-center items-center">
            <div className="container w-full sm:w-[400px]">
              <div className="folder">
                <div className="front-side">
                  <div className="tip"></div>
                  <div className="cover"></div>
                </div>
                <div className="back-side cover"></div>
              </div>
              <label className="custom-file-upload font-bold text-sm sm:text-balance">
                <input
                  className="title"
                  multiple
                  accept=".jpg , .jpeg"
                  type="file"
                  onChange={handleFileChange}
                />
                {t("properties.crudProperty.upload")}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5 mb-5 px-4">
        {/* title */}
        <div className="col-span-12 lg:col-span-4 formItem">
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

        {/* baths */}
        <div className="col-span-12 lg:col-span-4 formItem">
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
            type="number"
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
        {/* beds */}
        <div className="col-span-12 lg:col-span-4 formItem">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.beds")}:
          </label>
          <br />
          <Select
            onValueChange={(value) => {
              setBedsValue(value);
            }}
          >
            <SelectTrigger className="w-full mt-3">
              {!bedsValue
                ? `${t("properties.submitForms.select.bedsSelect")}`
                : bedsValue}
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectLabel>
                  {t("properties.submitForms.select.bedsSelect")}
                </SelectLabel>
                {bedsList.map((typeU) => {
                  return (
                    <SelectItem key={typeU.id} value={typeU.name}>
                      {typeU.name.toUpperCase()}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.beds && errors.beds.type === "validate" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.bedsReqError")}
            </AlertValidation>
          )}
        </div>
        {/* sqt */}
        <div className="col-span-12 lg:col-span-4 formItem">
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
            type="number"
          />
          {errors.sqt && errors.sqt.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.sqtReqError")}
            </AlertValidation>
          )}
        </div>
        {/* shopping */}
        <div className="col-span-12 lg:col-span-4 formItem">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.distance.shop")}:
          </label>
          <br />
          <div className="w-full relative ">
            <input
              {...register("distShop", {
                required: true,
              })}
              className="bg-white border w-full p-2 outline-none rounded-md mt-3"
              placeholder={t("properties.crudProperty.placeholder")}
              type="number"
            />
            <div className="absolute top-10 -right-5 translate-x-[-50%] translate-y-[-50%] flex justify-end items-center gap-x-1">
              <div className="flex justify-center items-center">
                <label className="flex justify-end items-center gap-x-1">
                  <input type="radio" value="m" {...register("shopType")} />
                  <span>M</span>
                </label>
              </div>
              <div className="flex justify-center items-center">
                <label className="flex justify-end items-center gap-x-1">
                  <input
                    checked
                    type="radio"
                    value="km"
                    {...register("shopType")}
                  />
                  <span>KM</span>
                </label>
              </div>
            </div>
          </div>
          {errors.distShop && errors.distShop.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.distanceReqError")}
            </AlertValidation>
          )}
        </div>
        {/* airport */}
        <div className="col-span-12 lg:col-span-4 formItem">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.distance.airport")}:
          </label>
          <br />
          <div className="w-full relative ">
            <input
              {...register("distAirport", {
                required: true,
              })}
              className="bg-white border w-full p-2 outline-none rounded-md mt-3"
              placeholder={t("properties.crudProperty.placeholder")}
              type="number"
            />
            <div className="absolute top-10 -right-5 translate-x-[-50%] translate-y-[-50%] flex justify-end items-center gap-x-1">
              <div className="flex justify-center items-center">
                <label className="flex justify-end items-center gap-x-1">
                  <input type="radio" value="m" {...register("airportType")} />
                  <span>M</span>
                </label>
              </div>
              <div className="flex justify-center items-center">
                <label className="flex justify-end items-center gap-x-1">
                  <input
                    checked
                    type="radio"
                    value="km"
                    {...register("airportType")}
                  />
                  <span>KM</span>
                </label>
              </div>
            </div>
          </div>
          {errors.distAirport && errors.distAirport.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.distanceReqError")}
            </AlertValidation>
          )}
        </div>
        {/* hospital */}
        <div className="col-span-12 lg:col-span-4 formItem">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.distance.hospital")}:
          </label>
          <br />
          <div className="w-full relative">
            <input
              {...register("distHospital", {
                required: true,
              })}
              className="bg-white border w-full p-2 outline-none rounded-md mt-3"
              placeholder={t("properties.crudProperty.placeholder")}
              type="number"
            />
            <div className="absolute top-10 -right-5 translate-x-[-50%] translate-y-[-50%] flex justify-end items-center gap-x-1">
              <div className="flex justify-center items-center">
                <label className="flex justify-end items-center gap-x-1">
                  <input type="radio" value="m" {...register("hospitalType")} />
                  <span>M</span>
                </label>
              </div>
              <div className="flex justify-center items-center">
                <label className="flex justify-end items-center gap-x-1">
                  <input
                    checked
                    type="radio"
                    value="km"
                    {...register("hospitalType")}
                  />
                  <span>KM</span>
                </label>
              </div>
            </div>
          </div>
          {errors.distHospital && errors.distHospital.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.distanceReqError")}
            </AlertValidation>
          )}
        </div>
        {/* sea */}
        <div className="col-span-12 lg:col-span-4 formItem">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.distance.sea")}:
          </label>
          <br />
          <div className="w-full relative">
            <input
              {...register("distSea", {
                required: true,
              })}
              className="bg-white border w-full p-2 outline-none rounded-md mt-3"
              placeholder={t("properties.crudProperty.placeholder")}
              type="number"
            />
            <div className="absolute top-10 -right-5 translate-x-[-50%] translate-y-[-50%] flex justify-end items-center gap-x-1">
              <div className="flex justify-center items-center">
                <label className="flex justify-end items-center gap-x-1">
                  <input type="radio" value="m" {...register("seaType")} />
                  <span>M</span>
                </label>
              </div>
              <div className="flex justify-center items-center">
                <label className="flex justify-end items-center gap-x-1">
                  <input
                    checked
                    type="radio"
                    value="km"
                    {...register("seaType")}
                  />
                  <span>KM</span>
                </label>
              </div>
            </div>
          </div>
          {errors.distSea && errors.distSea.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.distSeaReqError")}
            </AlertValidation>
          )}
        </div>
        <div className="col-span-12 lg:col-span-4 formItem">
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
        <div className="col-span-12 lg:col-span-4 formItem">
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
        <div className="col-span-12 lg:col-span-4 formItem">
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
        <div className="col-span-12 lg:col-span-4 formItem">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.map")}:
          </label>
          <br />
          <input
            {...register("mapLink", {
              required: true,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            type="text"
          />
          {errors.mapLink && errors.mapLink.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.mapLinkReqError")}
            </AlertValidation>
          )}
        </div>
        {/* floor */}
        <div className="col-span-12 lg:col-span-4 formItem">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.floor")}:
          </label>
          <br />
          <input
            {...register("floor", {
              required: true,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            type="number"
          />
          {errors.mapLink && errors.mapLink.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.floorReqError")}
            </AlertValidation>
          )}
        </div>
        {/* Age Of Building */}
        <div className="col-span-12 lg:col-span-4 formItem">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.ageOfBuilding")}:
          </label>
          <br />
          <input
            {...register("ageOfBuilding", {
              required: true,
            })}
            className="bg-white border w-full p-2 outline-none rounded-md mt-3"
            placeholder={t("properties.crudProperty.placeholder")}
            type="number"
          />
          {errors.ageOfBuilding && errors.ageOfBuilding.type === "required" && (
            <AlertValidation>
              {t("properties.submitForms.addProperty.ageOfBuildingReqError")}
            </AlertValidation>
          )}
        </div>
        {/* price */}
        <div className="col-span-12 lg:col-span-4 formItem">
          <div className="grid grid-cols-12 gap-x-2">
            <div className={money ? "col-span-6" : "col-span-12"}>
              <label className="dark:text-white" htmlFor="">
                {t("properties.crudProperty.minprice")}:
              </label>
              <br />
              <input
                {...register("minPrice", {
                  required: true,
                })}
                onChange={(e) => {
                  handlePrice(e.target.value, "min");
                }}
                className="bg-white border w-full p-2 outline-none rounded-md mt-3"
                placeholder={t("properties.crudProperty.placeholder")}
                type="number"
              />
            </div>
            <div className={money ? "col-span-6" : " hidden"}>
              <label className="dark:text-white" htmlFor="">
                {t("properties.crudProperty.maxprice")}:
              </label>
              <br />
              <input
                {...register("maxPrice")}
                onChange={(e) => {
                  handlePrice(e.target.value, "max");
                }}
                className="bg-white border w-full p-2 outline-none rounded-md mt-3"
                placeholder={t("properties.crudProperty.placeholder")}
                type="number"
              />
            </div>
            <div className="col-span-12 flex justify-between items-center gap-x-2 dark:text-white pt-2">
              <div className="flex justify-start items-center gap-x-2">
                <button
                  onClick={() => setTypeMoney(0)}
                  type="button"
                  className={`border border-blue-600 rounded-full p-1 text-blue-600 hover:bg-blue-600 hover:text-white transition-all ${
                    typeMoney === 0 && "bg-blue-600 text-white"
                  } `}
                >
                  <FaDollarSign size={18} />
                </button>
                <button
                  onClick={() => setTypeMoney(1)}
                  type="button"
                  className={`border border-blue-600 rounded-full p-1 text-blue-600 hover:bg-blue-600 hover:text-white transition-all ${
                    typeMoney === 1 && "bg-blue-600 text-white"
                  } `}
                >
                  <MdOutlineCurrencyRuble size={18} />
                </button>
                <button
                  onClick={() => setTypeMoney(2)}
                  type="button"
                  className={`border border-blue-600 rounded-full p-1 text-blue-600 hover:bg-blue-600 hover:text-white transition-all ${
                    typeMoney === 2 && "bg-blue-600 text-white"
                  } `}
                >
                  <IoLogoEuro size={18} />
                </button>
              </div>
              <div className="flex justify-end items-center gap-x-2">
                <div className="flex justify-end items-center gap-x-2 h-[30px]">
                  <label htmlFor="labelCheckPrice">
                    {t("properties.crudProperty.activation")}
                  </label>
                  <input
                    id="labelCheckPrice"
                    type="checkbox"
                    onChange={(e) => {
                      setIsMoney(e.target.checked ? true : false);
                    }}
                  />
                </div>
                <p>{money ? `${minMoney} - ${maxMoney}` : minMoney}</p>
              </div>
            </div>
          </div>
        </div>
        {/* type unit */}
        <div className="col-span-12 lg:col-span-3 formItem">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.unitType")}:
          </label>
          <br />

          <Popover>
            <PopoverTrigger
              asChild
              className="w-full h-[60px] bg-white border p-2 outline-none rounded-md mt-3"
            >
              <button className="bg-white outline-none text-start flex justify-between items-center">
                <span>{t("properties.crudProperty.unitTypeSelect")}</span>
                <span>
                  <MdOutlineKeyboardArrowDown
                    className="text-slate-400"
                    size={18}
                  />
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="bg-white w-[150px] p-0">
              <div className="grid gap-4 w-full py-2">
                <div>
                  {typeHouses.map((typeH) => {
                    return (
                      <div
                        className="px-2 py-1 mb-2 flex justify-start items-center gap-x-2 hover:bg-blue-600 hover:text-white font-bold transition-all"
                        key={typeH.id}
                      >
                        <input
                          onChange={() => {
                            if (money) {
                              setTypeUnit((prev) =>
                                prev.includes(typeH.id)
                                  ? prev.filter((item) => item !== typeH.id)
                                  : [...prev, typeH.id]
                              );
                            } else {
                              setTypeUnit([typeH.id]);
                            }
                          }}
                          id={`typeHouses+${typeH.id}`}
                          type={money ? "checkbox" : "radio"}
                          name={!money ? "roomsItemUnit" : ""}
                          checked={typeUnit.includes(typeH.id)}
                        />
                        <label
                          className="w-full cursor-pointer"
                          htmlFor={`typeHouses+${typeH.id}`}
                        >
                          {typeH.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <ul className="flex justify-start items-center gap-x-2 mt-1 overflow-x-scroll scrollbar-custom">
            {selectedTypesUnit.length >= 0 &&
              selectedTypesUnit.map((typeUnitOp, index) => {
                return (
                  <li
                    className="bg-blue-600 rounded-[40px] px-3 text-white"
                    key={index}
                  >
                    {typeUnitOp}
                  </li>
                );
              })}
          </ul>
        </div>

        {/* location */}
        <div className="col-span-12 lg:col-span-3 formItem">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.location")}:
          </label>
          <br />
          <Select
            onValueChange={(value) => {
              setLocationValue(value);
              const locKey = locs.find((loc) => loc.location_key === value);
              setLocationId(locKey?.id);
            }}
          >
            <SelectTrigger className="w-full mt-3">
              {t("properties.crudProperty.location")}
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectLabel>
                  {t("properties.submitForms.select.location")}
                </SelectLabel>
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
        {/* area */}
        {locationValue !== 0 && (
          <div className="col-span-12 lg:col-span-3 formItem">
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
                  <SelectLabel>
                    {t("properties.submitForms.select.area")}
                  </SelectLabel>
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
        {/* type */}
        <div className="col-span-12 lg:col-span-3 formItem">
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
        {/* furnished */}
        <div className="col-span-12 lg:col-span-3 formItem">
          <label className="dark:text-white" htmlFor="">
            {t("properties.crudProperty.furnished")}:
          </label>
          <br />
          <Select
            onValueChange={(value) => {
              setFurnished(value === "1" ? true : false);
            }}
          >
            <SelectTrigger className="w-full mt-3 flex justify-between items-center">
              {furnished
                ? t("properties.crudProperty.furnishedOn")
                : t("properties.crudProperty.furnishedOff")}
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectLabel>
                  {t("properties.submitForms.select.furnished")}
                </SelectLabel>
                <SelectItem value="1">
                  {t("properties.crudProperty.furnishedOn")}
                </SelectItem>
                <SelectItem value="0">
                  {t("properties.crudProperty.furnishedOff")}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* more details */}
        <div className="col-span-12 md:col-span-12">
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
        {/* tags */}
        <div className="col-span-12 md:col-span-6 mb-5 border border-blue-600 rounded-md p-5">
          <div>
            <h2 className="text-blue-600 dark:text-white text-lg mb-4">
              {t("properties.crudProperty.tagLabel")}
            </h2>
          </div>
          <div className="overflow-x-scroll scrollbar-custom flex flex-nowrap whitespace-nowrap justify-start items-center gap-x-3 p-3">
            {tags.map((tags) => {
              return (
                <FeaturesPropertyCard
                  key={tags.id}
                  feature={tags}
                  toggleFeature={toggleTag}
                />
              );
            })}
          </div>
        </div>
        {/* features */}
        <div className=" col-span-12 md:col-span-6  mb-5  border border-blue-600 rounded-md p-5">
          <div>
            <h2 className="text-blue-600 dark:text-white text-lg mb-4">
              {t("properties.crudProperty.features")}
            </h2>
          </div>
          <div className="overflow-x-scroll scrollbar-custom flex flex-nowrap whitespace-nowrap justify-start items-center gap-x-3 p-3">
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
        {/* heating */}
        <div className=" col-span-12 md:col-span-6 mb-5  border border-blue-600 rounded-md p-5">
          <div>
            <h2 className="text-blue-600 dark:text-white text-lg mb-4">
              {t("properties.crudProperty.typeOfHeating")}
            </h2>
          </div>
          <div className="overflow-x-scroll scrollbar-custom flex flex-nowrap whitespace-nowrap justify-start items-center gap-x-3 p-3">
            {heating.map((heat) => {
              return (
                <HeatCard key={heat.id} heat={heat} toggleHeat={toggleHeat} />
              );
            })}
          </div>
        </div>
        {/* landscapes */}
        <div className=" col-span-12 md:col-span-6 mb-5  border border-blue-600 rounded-md p-5">
          <div>
            <h2 className="text-blue-600 dark:text-white text-lg mb-4">
              {t("properties.crudProperty.landscape")}
            </h2>
          </div>
          <div className="overflow-x-scroll scrollbar-custom flex flex-nowrap whitespace-nowrap justify-start items-center gap-x-3 p-3">
            {landscapesData.map((landscape) => {
              return (
                <LandscapeCard
                  key={landscape.id}
                  landscape={landscape}
                  toggleLandscape={toggleLandscape}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mb-10">
        <button
          disabled={loading}
          className="bg-blue-600 text-white rounded-md overflow-hidden py-2 px-5 hover:bg-blue-700 hover:scale-105 transition-all"
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
