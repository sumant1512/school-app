import { Component, OnInit, Input } from "@angular/core";
import { AdminService } from "src/app/ADMIN/+services/admin.service";
import { studentAcademicRecordTransform } from "./profile-view-result.transform";
import {
  StudentClassListType,
  StudentResultType,
  TransformedAcademicRecord,
} from "./profile-view-result.type";
import { ACADEMIC_RECORD_COLUMN_NAME, CLASS_COLUMN } from './profile-view-result.constants';

@Component({
  selector: "app-profile-view-result",
  templateUrl: "./profile-view-result.component.html",
  styleUrls: ["./profile-view-result.component.css"],
})
export class ProfileViewResultComponent implements OnInit {
  @Input() selectedStudentDetail: string;
  academicRecordColumns = ACADEMIC_RECORD_COLUMN_NAME;
  classColumn = CLASS_COLUMN;
  studentClassList: TransformedAcademicRecord[];
  studentAcademicRecord: StudentResultType[];
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
        this.studentClassList = response["data"][0];
        this.studentAcademicRecord = response["data"][1];
        this.transformedStudentAcademicRecord = studentAcademicRecordTransform(
          this.studentClassList,
          this.studentAcademicRecord
        );
        console.log(this.transformedStudentAcademicRecord);
      }
    });
  }
}
