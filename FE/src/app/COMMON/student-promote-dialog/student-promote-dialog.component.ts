import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { StudentPromoteType } from "./student-promote-dialog.type";

@Component({
  selector: "app-student-promote-dialog",
  templateUrl: "./student-promote-dialog.component.html",
  styleUrls: ["./student-promote-dialog.component.css"],
})
export class StudentPromoteDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<StudentPromoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentPromoteType
  ) {}

  ngOnInit() {
    console.log(this.data);
  }
}
