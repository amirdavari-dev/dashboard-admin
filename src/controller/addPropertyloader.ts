import { httpService } from "@/core/http-service";
import { RegisterAction } from "@/types/identity";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const getAddData = async () => {
  const locale = localStorage.getItem("language");
  const features = await httpService.get(
    `/dashboard/properties/features/${locale}`
  );
  const locations = await httpService.get(`/real-estates/locations/${locale}`);
  const types = await httpService.get(`/dashboard/properties/types/${locale}`);
  const tags = await httpService.get(`/dashboard/properties/tags/${locale}`);
  const landscapes = await httpService.get(
    `/dashboard/properties/landscapes/${locale}`
  );
  const heating = await httpService.get(
    `/dashboard/properties/heating-types/${locale}`
  );
  if (
    locations.status === 200 &&
    types.status === 200 &&
    tags.status === 200 &&
    features.status === 200 &&
    landscapes.status === 200 &&
    heating.status === 200
  ) {
    return {
      locs: locations.data,
      types: types.data,
      tags: tags.data,
      features: features.data,
      landscapesData: landscapes.data,
      heating: heating.data,
    };
  }
};
export const insertProperty = async ({ request }: RegisterAction) => {
  const locale = localStorage.getItem("language");
  const formData = await request.FormData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post(`/dashboard/create/${locale}`, {
    title: data.title,
    price: data.price,
    location: data.locationValue,
    area: data.areaValue,
    baths: data.area,
    beds: data.beds,
    sqt: data.sqt,
    distToShop: data.distShop,
    distToAirport: data.distAirport,
    distToHospital: data.distHospital,
    type: data.typeValue,
    details: data.description,
    buyMedia: data.buyPropertyLink,
    availableMedia: data.availablePropertyLink,
    download: data.brochureLink,
    imagesArr: data.images,
    tag: data.tagValue,
    featuresArr: data.features,
  });
  if (response.status === 200) {
    toast.success("Insert Is Successfully");
    return redirect("/");
  }
};
