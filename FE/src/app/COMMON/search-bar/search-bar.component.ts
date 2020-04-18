import { Component, OnInit } from "@angular/core";
import { SEARCH_BAR } from "./search-bar.constants";
import { FormGroup } from "@angular/forms";
import { searchForm } from "./search-bar.utils";
import { AdminService } from "src/app/ADMIN/+services/admin.service";
import { Router } from "@angular/router";
import { ErrorDialogFunctionsService } from "../error-message-dialog/error-dialog-functions.service";
import { ClassService } from "src/app/STORE/class/api/class.service";

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
    private classService: ClassService,
    private router: Router,
    private errorService: ErrorDialogFunctionsService
  ) {}

  ngOnInit() {
    this.searchForm = searchForm();
    this.fetchClass();
  }

  // function to get class list
  fetchClass() {
    this.classService.fetchClass().subscribe((response) => {
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
