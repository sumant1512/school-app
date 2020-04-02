import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AdminService } from "../services/admin.service";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";

@Component({
  selector: "app-house",
  templateUrl: "./house.component.html",
  styleUrls: ["./house.component.css"]
})
export class HouseComponent implements OnInit {
  addHouseForm: FormGroup;
  houseList: object[];
  spinner: boolean = false;

  constructor(
    private adminService: AdminService,
    private errorService: ErrorDialogFunctionsService
  ) {
    this.addHouseForm = new FormGroup({
      houseName: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.getHouse(); // to get house list on load page
  }

  // function to reset house form
  resetForm() {
    this.addHouseForm.reset();
    this.addHouseForm.markAsUntouched();
  }

  // function to add House
  addHouse() {
    var houseDetail = this.addHouseForm.value;
    this.adminService.addHouse(houseDetail).subscribe(response => {
      if (response["status"] === true) {
        this.houseList = response["data"];
        this.resetForm();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get House list
  getHouse() {
    this.adminService.getHouse().subscribe(response => {
      if (response["status"] === true) {
        this.houseList = response["data"];
        this.spinner = true;
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to delete House
  deleteHouse(houseId) {
    var houseDetail = {
      houseId: houseId
    };
    this.adminService.deleteHouse(houseDetail).subscribe(response => {
      if (response["status"] === true) {
        this.houseList = response["data"];
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }
}
