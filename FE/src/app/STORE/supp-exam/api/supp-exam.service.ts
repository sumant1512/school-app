import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SuppExamService {
  constructor(private http: HttpClient) {}

  // service for adding supp exam
  addSuppExam(suppExamDetail) {
    return this.http.post("http://localhost:8080/addSuppExam", suppExamDetail);
  }

  // service for fetching supp exam
  fetchSuppExam() {
    return this.http.get("http://localhost:8080/fetchSuppExam");
  }

  // service for deleting supp exam
  deleteSuppExam(suppExamDetail) {
    return this.http.post("http://localhost:8080/deleteSuppExam", suppExamDetail);
  }

  // service for adding supp exam
  updateSuppExam(suppExamDetail) {
    return this.http.post("http://localhost:8080/updateSuppExam", suppExamDetail);
  }
}
