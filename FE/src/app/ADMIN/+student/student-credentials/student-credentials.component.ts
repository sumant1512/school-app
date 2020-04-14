import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../+services/admin.service";
import { STUDENT_CREDENTIAL } from './student-credentials.constants';

@Component({
  selector: "app-student-credentials",
  templateUrl: "./student-credentials.component.html",
  styleUrls: ["./student-credentials.component.css"],
})
export class StudentCredentialsComponent implements OnInit {
  LABELS = STUDENT_CREDENTIAL;
  spinner: boolean = false;
  studentCredentialList: object[];
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getStudentCredentialList();
  }

  getStudentCredentialList() {
    this.adminService.getStudentCredentialList().subscribe((response) => {
      if (response["status"]) {
        this.studentCredentialList = response["data"];
        this.spinner = true;
      }
    });
  }
}
