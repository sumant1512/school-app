export interface ReligionListType {
  religionList: ReligionType[];
}

export interface ReligionType {
  religion_id: number;
  religion_name: string;
  created_on: string;
  last_updated_on: string;
}
