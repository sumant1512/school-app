import { Component, OnInit, Input } from "@angular/core";
import { AdminService } from "src/app/ADMIN/+services/admin.service";
import { FEES_CHART_COLUMN_NAME } from "./fee-details.constants";
import { MatDialog } from "@angular/material";
import { FeeCollectDialogComponent } from "../fee-collect-dialog/fee-collect-dialog.component";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { feeStatusUpdate, feeTypeUpdate } from "./fee-detail.transform";
import {
  InstallmentListType,
  FeeDetailType,
  InstallmentWithFeeDetailTransform,
} from "./fee-details.type";

@Component({
  selector: "app-fee-details",
  templateUrl: "./fee-details.component.html",
  styleUrls: ["./fee-details.component.css"],
})
export class FeeDetailsComponent implements OnInit {
  feeChartColumns = FEES_CHART_COLUMN_NAME;
  @Input() selectedStudentDetail: string;
  installmentList: InstallmentListType[];
  feeDetails: FeeDetailType[];
  installmentWithFeeDetail: InstallmentWithFeeDetailTransform[];
  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private errorService: ErrorDialogFunctionsService
  ) {}

  ngOnInit() {
    this.getInstallmentForClass();
    this.getStudentFeeDetails();
  }

  // function to get installment by class
  getInstallmentForClass() {
    const classDetail = { classId: this.selectedStudentDetail["classId"] };
    this.adminService
      .getInstallmentForClass(classDetail)
      .subscribe((response) => {
        if (response["status"]) {
          this.installmentList = response["data"];
          this.installmentWithFeeDetail = feeTypeUpdate(this.installmentList);
        }
      });
  }

  // function to get student fee details
  getStudentFeeDetails() {
    const studentDetail = {
      studentId: this.selectedStudentDetail["studentId"],
    };
    this.adminService
      .getStudentFeeDetails(studentDetail)
      .subscribe((response) => {
        if (response["status"]) {
          this.feeDetails = response["data"];
          this.installmentWithFeeDetail = feeStatusUpdate(
            this.installmentWithFeeDetail,
            this.feeDetails
          );
        }
      });
  }

  // function to open dialog to collect fee
  openFeeCollectFialog(
    installmentId: number,
    installmentAmount: number,
    installmentName: string
  ) {
    let feeDetails = {
      studentId: this.selectedStudentDetail["studentId"],
      classId: this.selectedStudentDetail["classId"],
      installmentId: installmentId,
      installmentName: installmentName,
      installmentAmount: installmentAmount,
    };
    const dialogRef = this.dialog.open(FeeCollectDialogComponent, {
      width: "550px",
      data: feeDetails,
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response["status"]) {
        this.getInstallmentForClass();
        this.getStudentFeeDetails();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        if (response["message"] != "cancelled") {
          this.errorService.openErrorDialog(response["message"]);
        }
      }
    });
  }

  returnFee(installmentId: number) {
    let feeDetails = {
      studentId: this.selectedStudentDetail["studentId"],
      classId: this.selectedStudentDetail["classId"],
      installmentId: installmentId,
    };
    this.adminService.returnFee(feeDetails).subscribe((response) => {
      if (response["status"]) {
        this.getInstallmentForClass();
        this.getStudentFeeDetails();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }
}
