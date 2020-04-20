export interface HouseListType {
  houseList: HouseType[];
}

export interface HouseType {
  house_id: number;
  house_name: string;
  created_on: string;
  last_updated_on: string;
}
