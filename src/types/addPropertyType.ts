export type FormData = {
  title: string;
  price: number;
  baths: number;
  beds: number;
  sqt: number;
  distShop: number;
  distAirport: number;
  distHospital: number;
  brochureLink: string;
  buyPropertyLink: string;
  availablePropertyLink: string;
  description: string;
  mapLink : string
};
export type AddPropertyDataType = {
  locs: {
    id: number;
    location_name: string;
    location_key: string;
  }[];
  types: { id: number; name: string }[];
  tags: { id: number; name: string; tag_key: string }[];
  features : {id : number , name : string}[]
};

export type ImgsPropType = {
    id: number;
    file_name: string;
    property_id: number;
}
export type GetRealEstatesType = {
  area: string;
  bathroom: number;
  bed_room: number;
  id: number;
  images : ImgsPropType[]
  location: string;
  metrage: number;
  price: number;
  tag: string;
  title: string;
  type: string;
}[];
