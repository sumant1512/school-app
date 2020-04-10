import { Component, OnInit, Input } from "@angular/core";
import { AdminService } from "src/app/ADMIN/+services/admin.service";
import { FEES_CHART_COLUMN_NAME } from './fee-details.constants';

@Component({
  selector: "app-fee-details",
  templateUrl: "./fee-details.component.html",
  styleUrls: ["./fee-details.component.css"],
})
export class FeeDetailsComponent implements OnInit {
  feeChartColumns = FEES_CHART_COLUMN_NAME;
  @Input() selectedStudentDetail: string;
  installmentList: object[];
  constructor(private adminService: AdminService) {}

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
          console.log(this.installmentList)
        }
      });
  }
}
