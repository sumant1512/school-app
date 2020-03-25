import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { AdminService } from "../services/admin.service";
import { ErrorMessageDialogComponent } from "src/app/COMMON/error-message-dialog/error-message-dialog.component";

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
    private fb: FormBuilder,
    private adminService: AdminService,
    private dialog: MatDialog
  ) {
    this.addCategoryForm = new FormGroup({
      categoryName: new FormControl('', Validators.required)
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
        this.openDialog(response["message"]);
      } else {
        this.openDialog(response["message"]);
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
        this.openDialog(response["message"]);
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
      console.log("Class Added");
    });
  }
}
