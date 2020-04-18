import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ClassWithSectionService {
  constructor(private http: HttpClient) {}

  // service for getting class with section
  getClassWithSection() {
    return this.http.get("http://localhost:8080/getClassWithSection");
  }
}
