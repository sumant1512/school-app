import { Component, OnInit } from "@angular/core";
import { SEARCH_BAR } from "./search-bar.constants";
import { FormGroup } from "@angular/forms";
import { searchForm } from "./search-bar.utils";
import { AdminService } from "src/app/ADMIN/+services/admin.service";
import { Router } from "@angular/router";
import { ErrorDialogFunctionsService } from "../error-message-dialog/error-dialog-functions.service";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"],
})
export class SearchBarComponent implements OnInit {
  LABELS = SEARCH_BAR;
  searchForm: FormGroup;
  classList: object[];
  sectionListForSelectedClass: object[];

  constructor(
    private adminService: AdminService,
    private router: Router,
    private errorService: ErrorDialogFunctionsService
  ) {}

  ngOnInit() {
    this.searchForm = searchForm();
    this.getClass();
  }

  // function to get class list
  getClass() {
    this.adminService.getClass().subscribe((response) => {
      if (response["status"] === true) {
        this.classList = response["data"];
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  getSectionForClass(classId) {
    var selectedClass = {
      classId: classId,
    };
    this.adminService
      .getSectionForClass(selectedClass)
      .subscribe((response) => {
        if (response["status"] === true) {
          if (response["data"] == "") {
            this.errorService.openErrorDialog(
              "Sections for this class is not added.Please add Sections"
            );
            this.router.navigate(["section"]);
          } else {
            this.sectionListForSelectedClass = response["data"];
          }
        } else {
          this.errorService.openErrorDialog(response["message"]);
        }
      });
    // this.checkFeeStructureByClass(selectedClass);
  }
}
