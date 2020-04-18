import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ClassService {
  constructor(private http: HttpClient) {}

  // service for adding class
  addClass(classDetail) {
    return this.http.post("http://localhost:8080/addClass", classDetail);
  }

  // service to fetch class
  fetchClass() {
    return this.http.get("http://localhost:8080/fetchClass");
  }
}
