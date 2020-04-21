import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ErrorDialogFunctionsService } from "../../../COMMON/error-message-dialog/error-dialog-functions.service";
import { Location } from "@angular/common";
import { StudentService } from "src/app/STORE/student-list/api/student.service";

@Component({
  selector: "app-student-profile",
  templateUrl: "./student-profile.component.html",
  styleUrls: ["./student-profile.component.css"],
})
export class StudentProfileComponent implements OnInit {
  studentDetailParams: any;
  attendenceRecord: any;
  allResult: Object;
  studentDetail: any;
  feeStatus: any;
  feeTypes: any;
  viewResultStatus = false;
  selectedStudentDetail: object;

  constructor(
    private activatedPath: ActivatedRoute,
    private errorService: ErrorDialogFunctionsService,
    private studentService: StudentService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getDataFromQueryParams();
  }

  backPage() {
    this.location.back();
  }

  getDataFromQueryParams() {
    this.activatedPath.queryParams.subscribe((params) => {
      this.studentDetailParams = params;
      this.getStudentProfile();
    });
  }

  getStudentProfile() {
    var studentDetail = this.studentDetailParams;
    this.studentService
      .getStudentProfile(studentDetail)
      .subscribe((response) => {
        if (response["status"] === true) {
          this.studentDetail = response["data"];
          this.selectedStudentDetail = {
            classId: this.studentDetail[0].class_id,
            studentId: this.studentDetailParams.studentId,
          };
        } else {
          this.errorService.openErrorDialog(response["message"]);
        }
      });
  }

  // getInstallmentsByClass() {
  //   var dta = this.studentDetail[0].class;
  //   var studentDetail = { class: dta };
  //   this.studentService.getInstallmentsByClass(studentDetail).subscribe(response => {
  //     if (response["status"] === true) {
  //       this.feeTypes = response["data"];
  //       console.log("Fee type by class", this.feeTypes);
  //     } else {
  //       alert("Error");
  //     }
  //   });
  // }

  // getStudentFeeStatus() {
  //   var studentDetail = {
  //     admissionNumber: this.forStudentDetail.admissionNumber,
  //     class: this.studentDetail[0].class
  //   };
  //   this.studentService.getFeeStatusOfStudent(studentDetail).subscribe(response => {
  //     if (response["status"] === true) {
  //       this.feeStatus = response["data"];
  //       for (var i in this.feeTypes) {
  //         for (var key in this.feeStatus[0]) {
  //           if (this.feeTypes[i].feeType == key) {
  //             this.feeTypes[i].status = this.feeStatus[0][key]; //Object.values(feestatus[0])[2]
  //           }
  //         }
  //       }
  //     }
  //   });
  // }

  // getStudentResult() {
  //   var studentDetail = this.forStudentDetail;
  //   this.studentService.getStudentResult(studentDetail).subscribe(response => {
  //     if (response["status"] === true) {
  //       this.allResult = response["data"];
  //       console.log("Results", this.allResult);
  //     } else {
  //       this.errorService.openErrorDialog(response["message"]);
  //     }
  //   });
  // }

  // getAttendence() {
  //   var studentDetail = this.forStudentDetail;
  //   this.studentService.getAttendenceOfStudent(studentDetail).subscribe(response => {
  //     if (response["status"] === true) {
  //       this.attendenceRecord = response["data"];
  //       console.log("Attendence", this.attendenceRecord);
  //     } else {
  //       this.errorService.openErrorDialog(response["message"]);
  //     }
  //   });
  // }
}
