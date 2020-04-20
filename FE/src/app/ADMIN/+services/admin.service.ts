import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient) {}

  // service for getting class with exam
  getClassWithExam() {
    return this.http.get("http://localhost:8080/getClassWithExam");
  }

  // service for removing exam from class
  removeExam(examDetails) {
    return this.http.post("http://localhost:8080/removeExam", examDetails);
  }

  // common service for assigning to class
  assignToClass(assignDetails) {
    return this.http.post("http://localhost:8080/assignToClass", assignDetails);
  }

  // service to get section on the basis of selected class
  getSectionForClass(classDetail) {
    return this.http.post(
      "http://localhost:8080/getSectionForClass",
      classDetail
    );
  }

  // service for getting class with subject
  getClassWithSubject() {
    return this.http.get("http://localhost:8080/getClassWithSubject");
  }

  // service for removing subject to class
  removeSubject(subjectDetails) {
    return this.http.post(
      "http://localhost:8080/removeSubject",
      subjectDetails
    );
  }

  // service to get subject on the basis of selected class
  getSubjectForClass(classDetail) {
    return this.http.post(
      "http://localhost:8080/getSubjectForClass",
      classDetail
    );
  }

  // service for adding category
  addCategory(categoryDetail) {
    return this.http.post("http://localhost:8080/addCategory", categoryDetail);
  }

  // service for getting category list
  getCategory() {
    return this.http.get("http://localhost:8080/getCategory");
  }

  // service for deleting category
  deleteCategory(categoryDetail) {
    return this.http.post(
      "http://localhost:8080/deleteCategory",
      categoryDetail
    );
  }

  // service for adding religion
  addReligion(religionDetail) {
    return this.http.post("http://localhost:8080/addReligion", religionDetail);
  }

  // service for getting religion list
  getReligion() {
    return this.http.get("http://localhost:8080/getReligion");
  }

  // service for deleting religion
  deleteReligion(religionDetail) {
    return this.http.post(
      "http://localhost:8080/deleteReligion",
      religionDetail
    );
  }

  // service for adding Bus
  addBus(busDetail) {
    return this.http.post("http://localhost:8080/addBus", busDetail);
  }

  // service for getting Bus list
  getBus() {
    return this.http.get("http://localhost:8080/getBus");
  }

  // service for deleting Bus
  deleteBus(busDetail) {
    return this.http.post("http://localhost:8080/deleteBus", busDetail);
  }

  // service to schedule exam
  scheduleExam(examDetails) {
    return this.http.post("http://localhost:8080/scheduleExam", examDetails);
  }

  // service to check and get time table
  checkTimeTable(examDetails) {
    return this.http.post("http://localhost:8080/checkTimeTable", examDetails);
  }

  // service to delete exam schedule
  deleteExamSchedule(examDetails) {
    return this.http.post(
      "http://localhost:8080/deleteExamSchedule",
      examDetails
    );
  }

  // service to get subject list for result
  getSubjectForSelectedExamResultCreate(examDetail) {
    return this.http.post(
      "http://localhost:8080/getSubjectForSelectedExamResultCreate",
      examDetail
    );
  }

  // service to get exam list
  getExamsForClass(classDetail) {
    return this.http.post(
      "http://localhost:8080/getExamsForClass",
      classDetail
    );
  }

  // service to save student result
  saveStudentResult(result) {
    return this.http.post("http://localhost:8080/saveStudentResult", result);
  }

  // service to get student academic record
  getAcademicRecord(studentDetail) {
    return this.http.post(
      "http://localhost:8080/getAcademicRecord",
      studentDetail
    );
  }

  // service for adding installment
  addInstallment(examDetail) {
    return this.http.post("http://localhost:8080/addInstallment", examDetail);
  }

  // service for adding installment
  updateInstallment(installmentDetail) {
    return this.http.post(
      "http://localhost:8080/updateInstallment",
      installmentDetail
    );
  }

  // service for getting installment
  getInstallment() {
    return this.http.get("http://localhost:8080/getInstallment");
  }

  // service for deleting installment
  deleteInstallment(installmentDetail) {
    return this.http.post(
      "http://localhost:8080/deleteInstallment",
      installmentDetail
    );
  }

  // service for getting class with installment
  getClassWithInstallment() {
    return this.http.get("http://localhost:8080/getClassWithInstallment");
  }

  // service for removing installment to class
  removeInstallment(installmentDetails) {
    return this.http.post(
      "http://localhost:8080/removeInstallment",
      installmentDetails
    );
  }

  // service to get installment list
  getInstallmentForClass(classDetail) {
    return this.http.post(
      "http://localhost:8080/getInstallmentForClass",
      classDetail
    );
  }

  // service for getting student credentials
  getStudentCredentialList() {
    return this.http.get("http://localhost:8080/getStudentCredentialList");
  }

  // service to collect fee
  collectFee(feeDetail) {
    return this.http.post("http://localhost:8080/collectFee", feeDetail);
  }

  // service to get student fee details
  getStudentFeeDetails(studentDetail) {
    return this.http.post(
      "http://localhost:8080/getStudentFeeDetails",
      studentDetail
    );
  }

  // service to return fee if colected by mistake
  returnFee(feeDetail) {
    return this.http.post("http://localhost:8080/returnFee", feeDetail);
  }
}
