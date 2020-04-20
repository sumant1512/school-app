import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminService } from "../+services/admin.service";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/STORE/app.state";
import * as CategoryActions from "../../STORE/category/category.actions";
import { addCategoryForm } from "./category.utils";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  addCategoryForm: FormGroup;
  categoryList: object[];
  spinner: boolean = false;
  update: boolean = false;
  updateCategoryId: number;

  constructor(
    private adminService: AdminService,
    private store: Store<AppState>,
    private errorService: ErrorDialogFunctionsService
  ) {
    this.addCategoryForm = addCategoryForm();
  }

  ngOnInit() {
    this.fetchCategory(); // to fetch category list on load page
  }

  // function to reset category form
  resetForm() {
    this.addCategoryForm.reset();
    this.addCategoryForm.markAsUntouched();
  }

  // function to call add or update
  category() {
    this.update ? this.updateCategory() : this.addCategory();
  }

  // function to add category
  addCategory() {
    var categoryDetail = this.addCategoryForm.value;
    this.store.dispatch(new CategoryActions.AddCategory(categoryDetail));
  }

  // function to update category
  updateCategory() {
    const categoryDetail = {
      categoryId: this.updateCategoryId,
      categoryName: this.addCategoryForm.value.categoryName,
    };
    this.store.dispatch(new CategoryActions.UpdateCategory(categoryDetail));
    this.resetForm();
  }

  // function to fetch category list
  fetchCategory() {
    this.store.dispatch(new CategoryActions.FetchCategory());
    this.store.select("categoryList").subscribe((response) => {
      this.categoryList = response.categoryList;
      this.spinner = true;
    });
  }

  // function to delete category
  deleteCategory(categoryId) {
    var categoryDetail = { categoryId: categoryId };
    this.store.dispatch(new CategoryActions.DeleteCategory(categoryDetail));
  }

  // function to activate add or update
  addCategoryFormOpen() {
    this.update = false;
    this.resetForm();
  }

  // function to edit category name
  editCategory(categoryId, categoryName) {
    this.update = true;
    this.updateCategoryId = categoryId;
    this.addCategoryForm.get("categoryName").setValue(categoryName);
  }
}
