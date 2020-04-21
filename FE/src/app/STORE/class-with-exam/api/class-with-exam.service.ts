import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ClassWithExamService {
  constructor(private http: HttpClient) {}

  // service for fetching class with exam
  fetchClassWithExam() {
    console.log("*************");
    return this.http.get("http://localhost:8080/fetchClassWithExam");
  }

  // service for removing exam from class
  removeExam(examDetails) {
    return this.http.post("http://localhost:8080/removeExam", examDetails);
  }
}
