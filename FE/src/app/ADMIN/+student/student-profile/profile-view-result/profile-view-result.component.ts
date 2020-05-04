import { Component, OnInit, Input } from "@angular/core";
import { AdminService } from "src/app/ADMIN/+services/admin.service";
import {
  studentAcademicRecordTransform,
  testFun,
} from "./profile-view-result.transform";
import { TransformedAcademicRecord } from "./profile-view-result.type";
import {
  ACADEMIC_RECORD_COLUMN_NAME,
  RESULT_COLUMN,
  LABELS,
} from "./profile-view-result.constants";

@Component({
  selector: "app-profile-view-result",
  templateUrl: "./profile-view-result.component.html",
  styleUrls: ["./profile-view-result.component.css"],
})
export class ProfileViewResultComponent implements OnInit {
  @Input() selectedStudentDetail: string;
  academicRecordColumns = ACADEMIC_RECORD_COLUMN_NAME;
  resultColumn = RESULT_COLUMN;
  labels = LABELS;
  transformedStudentAcademicRecord: TransformedAcademicRecord[];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getAcademicRecord();
  }

  // function to get academic record
  getAcademicRecord() {
    const studentDetail = {
      classId: this.selectedStudentDetail["classId"],
      studentId: this.selectedStudentDetail["studentId"],
    };
    this.adminService.getAcademicRecord(studentDetail).subscribe((response) => {
      if (response["status"]) {
        const studentClassList = response["data"][0];
        const studentAcademicRecord = response["data"][1];
        this.transformedStudentAcademicRecord = studentAcademicRecordTransform(
          studentClassList,
          studentAcademicRecord
        );
      }
    });
  }
}
