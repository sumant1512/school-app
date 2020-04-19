import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SectionService {
  constructor(private http: HttpClient) {}

  // service for adding section
  addSection(sectionDetail) {
    return this.http.post("http://localhost:8080/addSection", sectionDetail);
  }

  // service to fetch section list
  fetchSection() {
    return this.http.get("http://localhost:8080/fetchSection");
  }

  // service for deleting section
  deleteSection(sectionDetail) {
    return this.http.post("http://localhost:8080/deleteSection", sectionDetail);
  }
}
