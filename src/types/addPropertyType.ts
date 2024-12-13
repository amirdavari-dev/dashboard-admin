export type FormData = {
  floor: number;
  maxFloor: number;
  ageOfBuilding: string;
  distSea: string;
  title: string;
  minPrice: number;
  maxPrice: number;
  baths: number;
  maxBaths: number;
  beds: number;
  maxBeds: number;
  sqt: number;
  maxSqt: number;
  distShop: number;
  distAirport: number;
  distHospital: number;
  // brochureLink: string;
  buyPropertyLink: string;
  availablePropertyLink: string;
  description: string;
  mapLink: string;
  shopType: "m" | "km";
  airportType: "m" | "km";
  hospitalType: "m" | "km";
  seaType: "m" | "km";
};
export type HeatType = { id: number; name: string; heating_type_key: string };
export type LandType = { id: number; name: string; landscape_key: string };
export type AddPropertyDataType = {
  locs: {
    id: number;
    location_name: string;
    location_key: string;
  }[];
  types: { id: number; name: string }[];
  tags: { id: number; name: string; tag_key: string }[];
  features: { id: number; name: string }[];
  landscapesData: LandType[];
  heating: HeatType[];
  typeHouses: { id: number; name: string }[];
};

export type ImgsPropType = {
  id: number;
  file_name: string;
  property_id: number;
};
export type PropItemType = {
  area: string;
  bathroom: number;
  bed_room: number;
  id: number;
  images: ImgsPropType[];
  location: string;
  metrage: number;
  price: number;
  title: string;
  type: string;
};
export type GetRealEstatesType = {
  realEstates: Promise<PropItemType[]>;
};
