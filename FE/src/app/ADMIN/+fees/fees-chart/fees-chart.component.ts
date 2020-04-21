import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../+services/admin.service";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { FEES_CHART } from "./fees-chart.constants";
import { ClassService } from "src/app/STORE/class/api/class.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/STORE/app.state";

@Component({
  selector: "app-fees-chart",
  templateUrl: "./fees-chart.component.html",
  styleUrls: ["./fees-chart.component.css"],
})
export class FeesChartComponent implements OnInit {
  LABELS = FEES_CHART;
  classList: object[];
  spinner: boolean = false;
  classWithInstallment: object[];
  message: string;
  constructor(
    private adminService: AdminService,
    private store: Store<AppState>,
    private errorService: ErrorDialogFunctionsService
  ) {}

  ngOnInit() {
    this.fetchClass();
    this.getClassWithInstallment();
  }

  // function to get class list
  fetchClass() {
    this.store.select("classList").subscribe((response) => {
      this.classList = response.classList;
    });
  }

  // function to get class with installment
  getClassWithInstallment() {
    this.adminService.getClassWithInstallment().subscribe((response) => {
      if (response["status"] === true) {
        this.classWithInstallment = response["data"];
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to remove installment from class
  removeInstallment(classId, installmentId) {
    let installmentDetail = {
      classId: classId,
      installmentId: installmentId,
    };
    this.adminService
      .removeInstallment(installmentDetail)
      .subscribe((response) => {
        if (response["status"] === true) {
          this.fetchClass();
          this.getClassWithInstallment();
          this.errorService.openErrorDialog(response["message"]);
        } else {
          this.errorService.openErrorDialog(response["message"]);
        }
      });
  }
}
