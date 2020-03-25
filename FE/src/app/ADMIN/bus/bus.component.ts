import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AdminService } from "../services/admin.service";
import { MatDialog } from "@angular/material";
import { ErrorMessageDialogComponent } from "src/app/COMMON/error-message-dialog/error-message-dialog.component";

@Component({
  selector: "app-bus",
  templateUrl: "./bus.component.html",
  styleUrls: ["./bus.component.css"]
})
export class BusComponent implements OnInit {
  addBusForm: FormGroup;
  busList: object[];
  spinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private dialog: MatDialog
  ) {
    this.addBusForm = new FormGroup({
      busNumber: new FormControl('',Validators.required),
      busRoute: new FormControl('',Validators.required)
    });
  }

  ngOnInit() {
    this.getBus(); // to get house list on load page
  }

  // function to reset bus form
  resetForm() {
    this.addBusForm.reset();
    this.addBusForm.markAsUntouched();
  }

  // function to add House
  addBus() {
    var busDetail = this.addBusForm.value;
    this.adminService.addBus(busDetail).subscribe(response => {
      if (response["status"] === true) {
        this.busList = response["data"];
        this.resetForm();
        this.openDialog(response["message"]);
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // function to get House list
  getBus() {
    this.adminService.getBus().subscribe(response => {
      if (response["status"] === true) {
        this.busList = response["data"];
        this.spinner = true;
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // function to delete House
  deleteBus(busId) {
    var busDetail = {
      busId: busId
    };
    this.adminService.deleteBus(busDetail).subscribe(response => {
      if (response["status"] === true) {
        this.busList = response["data"];
        this.openDialog(response["message"]);
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // Error message
  openDialog(errorMessage: string) {
    const dialogRef = this.dialog.open(ErrorMessageDialogComponent, {
      width: "750px",
      data: { message: errorMessage }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("House Added");
    });
  }
}
