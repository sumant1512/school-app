import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminService } from "../+services/admin.service";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/STORE/app.state";
import * as CategoryActions from "../../STORE/category/category.actions";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  addCategoryForm: FormGroup;
  categoryList: object[];
  spinner: boolean = false;

  constructor(
    private adminService: AdminService,
    private store: Store<AppState>,
    private errorService: ErrorDialogFunctionsService
  ) {
    this.addCategoryForm = new FormGroup({
      categoryName: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.fetchCategory(); // to fetch category list on load page
  }

  // function to reset category form
  resetForm() {
    this.addCategoryForm.reset();
    this.addCategoryForm.markAsUntouched();
  }

  // function to add category
  addCategory() {
    var categoryDetail = this.addCategoryForm.value;
    this.store.dispatch(new CategoryActions.AddCategory(categoryDetail));
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
}
