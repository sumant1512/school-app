import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AdminService } from "../+services/admin.service";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";

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
    private adminService: AdminService,
    private errorService: ErrorDialogFunctionsService
  ) {
    this.addBusForm = new FormGroup({
      busNumber: new FormControl("", Validators.required),
      busRoute: new FormControl("", Validators.required)
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
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
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
        this.errorService.openErrorDialog(response["message"]);
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
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }
}
