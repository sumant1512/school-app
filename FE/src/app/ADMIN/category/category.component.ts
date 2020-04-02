import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminService } from "../services/admin.service";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  addCategoryForm: FormGroup;
  categoryList: object[];
  spinner: boolean = false;

  constructor(
    private adminService: AdminService,
    private errorService: ErrorDialogFunctionsService
  ) {
    this.addCategoryForm = new FormGroup({
      categoryName: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.getCategory(); // to get category list on load page
  }

  // function to reset category form
  resetForm() {
    this.addCategoryForm.reset();
    this.addCategoryForm.markAsUntouched();
  }

  // function to add category
  addCategory() {
    var categoryDetail = this.addCategoryForm.value;
    this.adminService.addCategory(categoryDetail).subscribe(response => {
      if (response["status"] === true) {
        this.categoryList = response["data"];
        this.resetForm();
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get category list
  getCategory() {
    this.adminService.getCategory().subscribe(response => {
      if (response["status"] === true) {
        this.categoryList = response["data"];
        this.spinner = true;
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to delete category
  deleteCategory(categoryId) {
    var categoryDetail = {
      categoryId: categoryId
    };
    this.adminService.deleteCategory(categoryDetail).subscribe(response => {
      if (response["status"] === true) {
        this.categoryList = response["data"];
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }
}
