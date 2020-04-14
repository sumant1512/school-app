import { Component, OnInit, Input } from "@angular/core";
import { AdminService } from "src/app/ADMIN/+services/admin.service";
import { FEES_CHART_COLUMN_NAME } from "./fee-details.constants";
import { MatDialog } from "@angular/material";
import { FeeCollectDialogComponent } from "../fee-collect-dialog/fee-collect-dialog.component";

@Component({
  selector: "app-fee-details",
  templateUrl: "./fee-details.component.html",
  styleUrls: ["./fee-details.component.css"],
})
export class FeeDetailsComponent implements OnInit {
  feeChartColumns = FEES_CHART_COLUMN_NAME;
  @Input() selectedStudentDetail: string;
  installmentList: object[];
  feeDetails: object;
  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getInstallmentForClass();
  }

  getInstallmentForClass() {
    const classDetail = { classId: this.selectedStudentDetail["classId"] };
    this.adminService
      .getInstallmentForClass(classDetail)
      .subscribe((response) => {
        if (response["status"]) {
          this.installmentList = response["data"];
        }
      });
  }

  // function to open dialog to collect fee
  openFeeCollectFialog(
    installmentId: number,
    installmentAmount: number,
    installmentName: string
  ) {
    this.feeDetails = {
      studentId: this.selectedStudentDetail["studentId"],
      classId: this.selectedStudentDetail["classId"],
      installmentId: installmentId,
      installmentName: installmentName,
      installmentAmount: installmentAmount,
    };
    const dialogRef = this.dialog.open(FeeCollectDialogComponent, {
      width: "500px",
      data: this.feeDetails,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Fee collected");
    });
  }
}
