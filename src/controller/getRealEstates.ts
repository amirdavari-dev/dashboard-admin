import { httpService } from "@/core/http-service";

export const getRealEstates = async ({request} : {request : Request}) => {
  const url = new URL(request.url);
  const locale = url.searchParams.get("lang") || localStorage.getItem("language") || "en";
  const realEstates = await httpService.get(`/real-estates/${locale}`);
  if (realEstates.status === 200) {
    return realEstates.data.realEstates;
  }else{
    return false
  }
};
