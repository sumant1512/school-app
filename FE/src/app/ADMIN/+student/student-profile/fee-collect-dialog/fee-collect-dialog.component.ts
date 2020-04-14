import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FeeCollectData } from "./fee-collect-dialog.type";
import { FEE_COLLECT_DIALOG } from "./fee-collect-dialog.constants";
import { AdminService } from "src/app/ADMIN/+services/admin.service";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";

@Component({
  selector: "app-fee-collect-dialog",
  templateUrl: "./fee-collect-dialog.component.html",
  styleUrls: ["./fee-collect-dialog.component.css"],
})
export class FeeCollectDialogComponent implements OnInit {
  LABELS = FEE_COLLECT_DIALOG;
  constructor(
    public dialogRef: MatDialogRef<FeeCollectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public feeCollectData: FeeCollectData,
    private adminService: AdminService,
    private errorService: ErrorDialogFunctionsService
  ) {}

  ngOnInit() {
    console.log(this.feeCollectData);
  }

  collectFee() {
    const feeDetail = this.feeCollectData;
    this.adminService.collectFee(feeDetail).subscribe((response) => {
      if (response["status"]) {
        this.dialogRef.close();
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }
}
