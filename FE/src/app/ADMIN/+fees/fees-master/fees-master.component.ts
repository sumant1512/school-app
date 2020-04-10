import { Component, OnInit } from "@angular/core";
import { FEES_MASTER } from "./fees-master.constants";
import { AssignDialogCommonComponent } from "src/app/COMMON/assign-dialog-common/assign-dialog-common.component";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { AssignToClassType } from "src/app/COMMON/assign-dialog-common/assign-dialog.type";
import { AdminService } from "../../+services/admin.service";
import { MatDialog } from "@angular/material";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { addInstallmentForm } from "./fees-master.utils";

@Component({
  selector: "app-fees-master",
  templateUrl: "./fees-master.component.html",
  styleUrls: ["./fees-master.component.css"],
})
export class FeesMasterComponent implements OnInit {
  LABELS = FEES_MASTER;
  addInstallmentForm: FormGroup;
  classList: object[];
  installmentList: object[];
  spinner: boolean = false;
  update: boolean = false;
  updateInstallmentId: number;
  assignData: AssignToClassType;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private errorService: ErrorDialogFunctionsService
  ) {
    this.addInstallmentForm = addInstallmentForm();
  }

  ngOnInit() {
    this.updateInstallmentId = 0;
    this.getClass(); // to get class list on page load
    this.getInstallment(); // to get installment list on page load
  }

  // function to get class list for dropdown
  getClass() {
    this.adminService.getClass().subscribe((response) => {
      if (response["status"] === true) {
        this.classList = response["data"];
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to call add or update
  installment() {
    if (this.update) {
      this.updateInstallment();
    } else {
      this.addInstallment();
    }
  }

  // function to reset exam
  resetForm() {
    this.addInstallmentForm.reset();
    this.addInstallmentForm.markAsUntouched();
  }

  // function to add exam
  addInstallment() {
    this.updateInstallmentId = 0;
    var installmentDetail = this.addInstallmentForm.value;
    this.adminService
      .addInstallment(installmentDetail)
      .subscribe((response) => {
        if (response["status"] === true) {
          this.installmentList = response["data"];
          this.resetForm();
          this.errorService.openErrorDialog(response["message"]);
        } else {
          this.errorService.openErrorDialog(response["message"]);
        }
      });
  }

  // function to update installment
  updateInstallment() {
    const installmentDetail = {
      installmentId: this.updateInstallmentId,
      installmentName: this.addInstallmentForm.value.installmentName,
      installmentAmount: this.addInstallmentForm.value.installmentAmount,
    };
    this.adminService
      .updateInstallment(installmentDetail)
      .subscribe((response) => {
        if (response["status"]) {
          this.installmentList = response["data"];
          this.resetForm();
          this.errorService.openErrorDialog(response["message"]);
        } else {
          this.errorService.openErrorDialog(response["message"]);
        }
      });
  }

  // function to get installment list
  getInstallment() {
    this.adminService.getInstallment().subscribe((response) => {
      if (response["status"] === true) {
        this.installmentList = response["data"];
        this.spinner = true;
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to delete installment
  deleteInstallment(installmentId) {
    var installmentDetail = {
      installmentId: installmentId,
    };
    this.adminService
      .deleteInstallment(installmentDetail)
      .subscribe((response) => {
        if (response["status"] === true) {
          this.installmentList = response["data"];
          this.errorService.openErrorDialog(response["message"]);
        } else {
          this.errorService.openErrorDialog(response["message"]);
        }
      });
  }

  // function to activate add or update
  addInstallmentFormOpenOrClose() {
    this.update = false;
    this.resetForm();
    this.addInstallmentForm.addControl("selectedClass", new FormControl(""));
  }

  // function to edit exam name
  editInstallment(
    installmentId,
    installmentName,
    installmentAmount,
    feeDueDate
  ) {
    this.update = true;
    this.updateInstallmentId = installmentId;
    this.addInstallmentForm.removeControl("selectedClass");
    this.addInstallmentForm.get("installmentName").patchValue(installmentName);
    this.addInstallmentForm
      .get("installmentAmount")
      .patchValue(installmentAmount);
    this.addInstallmentForm.get("feeDueDate").patchValue(feeDueDate);
  }

  // function to assign installment to class
  assignInstallment(installmentId, installmentName) {
    this.assignData = {
      id_to_be_assinged: installmentId,
      name_to_be_assinged: installmentName,
      property_to_be_assinged: "installment",
      table_name: "class_with_installment",
      row_name: "installment_id",
    };
    const dialogRef = this.dialog.open(AssignDialogCommonComponent, {
      width: "500px",
      data: this.assignData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Assign installment closed");
    });
  }
}
