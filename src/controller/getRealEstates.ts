import { httpService } from "@/core/http-service";

export const getRealEstates = async () => {
  const locale = localStorage.getItem("language");
  const realEstates = await httpService.get(`/real-estates/${locale}`);
  if (realEstates.status === 200) {
    return realEstates.data.realEstates;
  }else{
    return false
  }
};
