import { Component, OnInit } from "@angular/core";
import { StudentService } from "src/app/ADMIN/services/student.service";
import { ActivatedRoute } from "@angular/router";
import { ErrorDialogFunctionsService } from "../../../COMMON/error-message-dialog/error-dialog-functions.service";
import { Location } from '@angular/common';

@Component({
  selector: "app-student-profile",
  templateUrl: "./student-profile.component.html",
  styleUrls: ["./student-profile.component.css"]
})
export class StudentProfileComponent implements OnInit {
  studentDetailParams: any;
  attendenceRecord: any;
  allResult: Object;
  studentDetail: any;
  feeStatus: any;
  feeTypes: any;
  viewResultStatus: boolean;
  selectedStudentDetail: object;
  selectedClass: string;

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
    this.activatedPath.queryParams.subscribe(params => {
      console.log(params.admissionNumber);
      this.studentDetailParams = params;
      this.getStudentProfile();
      console.log("Ouery params from profile page", this.studentDetailParams);
    });
  }

  getStudentProfile() {
    var studentDetail = this.studentDetailParams;
    this.studentService.getStudentProfile(studentDetail).subscribe(response => {
      if (response["status"] === true) {
        this.studentDetail = response["data"];
        this.selectedClass = this.studentDetail[0].class_id;
        this.selectedStudentDetail = {
          classId: this.studentDetail[0].class_id,
          studentId: this.studentDetailParams.studentId
        }
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to display / hide result and result form
  viewResult(resultType: string){
    if(resultType === 'add'){
      this.viewResultStatus = true;
    }else {
      this.viewResultStatus = false;
    }
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
