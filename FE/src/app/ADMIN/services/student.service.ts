import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  constructor(private http: HttpClient) {}

  // service for student admission
  studentAdmission(studentDetail) {
    return this.http.post("http://localhost:8080/studentAdmission", studentDetail);
  }

  // service for getting all student list
  getStudentList() {
    return this.http.get("http://localhost:8080/getStudentList");
  }
}
