import { Component, OnInit, Input } from "@angular/core";
import { AdminService } from "src/app/ADMIN/+services/admin.service";
import { studentAcademicTransform } from "./profile-view-result.transform";

@Component({
  selector: "app-profile-view-result",
  templateUrl: "./profile-view-result.component.html",
  styleUrls: ["./profile-view-result.component.css"]
})
export class ProfileViewResultComponent implements OnInit {
  @Input() selectedStudentDetail: string;
  studentAcademicRecord: object[];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getAcademicRecord();
  }

  // function to get academic record
  getAcademicRecord() {
    const studentDetail = {
      classId: this.selectedStudentDetail["classId"],
      studentId: this.selectedStudentDetail["studentId"]
    };
    this.adminService.getAcademicRecord(studentDetail).subscribe(response => {
      if (response["status"]) {
        this.studentAcademicRecord = response["data"];
      }
    });
  }
}
