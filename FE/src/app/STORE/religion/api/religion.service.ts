import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ReligionService {
  constructor(private http: HttpClient) {}

  // service for adding religion
  addReligion(religionDetail) {
    return this.http.post("http://localhost:8080/addReligion", religionDetail);
  }

  // service for updating religion
  updateReligion(religionDetail) {
    return this.http.post(
      "http://localhost:8080/updateReligion",
      religionDetail
    );
  }

  // service for fetching religion list
  fetchReligion() {
    return this.http.get("http://localhost:8080/fetchReligion");
  }

  // service for deleting religion
  deleteReligion(religionDetail) {
    return this.http.post(
      "http://localhost:8080/deleteReligion",
      religionDetail
    );
  }
}
