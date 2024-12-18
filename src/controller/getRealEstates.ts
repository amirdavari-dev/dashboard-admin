import { httpService } from "@/core/http-service";
import { defer } from "react-router-dom";

export const getRealEstates = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const locale =
    url.searchParams.get("lang") || localStorage.getItem("language") || "en";
  return defer({
    realEstates: realEstates(locale),
  });
  // const url = new URL(request.url);
  // const locale =
  //   url.searchParams.get("lang") || localStorage.getItem("language") || "en";
  // const realEstates = await httpService.get(`/real-estates/${locale}`);
  // if (realEstates.status === 200) {
  //   return realEstates.data.realEstates;
  // } else {
  //   return false;
  // }
};

const realEstates = async (locale: string) => {
  const realEstates = await httpService.get(`/real-estates/${locale}`);
  console.log(realEstates.data.realEstates);
  
  return realEstates.data.realEstates;
};
