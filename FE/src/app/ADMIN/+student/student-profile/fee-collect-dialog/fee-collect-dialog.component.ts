import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FeeCollectData } from "./fee-collect-dialog.type";

@Component({
  selector: "app-fee-collect-dialog",
  templateUrl: "./fee-collect-dialog.component.html",
  styleUrls: ["./fee-collect-dialog.component.css"],
})
export class FeeCollectDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FeeCollectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public feeCollectData: FeeCollectData
  ) {}

  ngOnInit() {
    console.log(this.feeCollectData);
  }
}
