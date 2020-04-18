import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ClassWithSectionService {
  constructor(private http: HttpClient) {}

  // service for getting class with section
  fetchClassWithSection() {
    return this.http.get("http://localhost:8080/fetchClassWithSection");
  }

  // service for removing section from class
  removeSection(sectionDetails) {
    return this.http.post(
      "http://localhost:8080/removeSection",
      sectionDetails
    );
  }
}
