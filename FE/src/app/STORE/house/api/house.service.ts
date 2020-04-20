import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HouseService {
  constructor(private http: HttpClient) {}

  // service for adding house
  addHouse(houseDetail) {
    return this.http.post("http://localhost:8080/addHouse", houseDetail);
  }

  // service for updating house
  updateHouse(houseDetail) {
    return this.http.post("http://localhost:8080/updateHouse", houseDetail);
  }

  // service for fetching House list
  fetchHouse() {
    return this.http.get("http://localhost:8080/fetchHouse");
  }

  // service for deleting House
  deleteHouse(houseDetail) {
    return this.http.post("http://localhost:8080/deleteHouse", houseDetail);
  }
}
