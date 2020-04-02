import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminService } from "../services/admin.service";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";

@Component({
  selector: "app-religion",
  templateUrl: "./religion.component.html",
  styleUrls: ["./religion.component.css"]
})
export class ReligionComponent implements OnInit {
  addReligionForm: FormGroup;
  religionList: object[];
  spinner: boolean = false;

  constructor(
    private adminService: AdminService,
    private errorService: ErrorDialogFunctionsService
  ) {
    this.addReligionForm = new FormGroup({
      religionName: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.getReligion(); // to get category list on load page
  }

  // function to reset religion form
  resetForm() {
    this.addReligionForm.reset();
    this.addReligionForm.markAsUntouched();
  }

  // function to add religion
  addReligion() {
    var religionDetail = this.addReligionForm.value;
    this.adminService.addReligion(religionDetail).subscribe(response => {
      if (response["status"] === true) {
        this.religionList = response["data"];
        this.resetForm();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get religion list
  getReligion() {
    this.adminService.getReligion().subscribe(response => {
      if (response["status"] === true) {
        this.religionList = response["data"];
        this.spinner = true;
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to delete religion
  deleteReligion(religionId) {
    var religionDetail = {
      religionId: religionId
    };
    this.adminService.deleteReligion(religionDetail).subscribe(response => {
      if (response["status"] === true) {
        this.religionList = response["data"];
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }
}
