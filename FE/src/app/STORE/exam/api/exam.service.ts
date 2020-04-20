import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ExamService {
  constructor(private http: HttpClient) {}

  // service for adding exam
  addExam(examDetail) {
    return this.http.post("http://localhost:8080/addExam", examDetail);
  }

  // service for fetching exam
  fetchExam() {
    return this.http.get("http://localhost:8080/fetchExam");
  }

  // service for deleting exam
  deleteExam(examDetail) {
    return this.http.post("http://localhost:8080/deleteExam", examDetail);
  }

  // service for adding exam
  updateExam(examDetail) {
    return this.http.post("http://localhost:8080/updateExam", examDetail);
  }
}
