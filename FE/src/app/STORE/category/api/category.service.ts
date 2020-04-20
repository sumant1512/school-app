import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // service for adding category
  addCategory(categoryDetail) {
    return this.http.post("http://localhost:8080/addCategory", categoryDetail);
  }

  // service for updating category
  updateCategory(categoryDetail) {
    return this.http.post(
      "http://localhost:8080/updateCategory",
      categoryDetail
    );
  }

  // service for fetching category list
  fetchCategory() {
    return this.http.get("http://localhost:8080/fetchCategory");
  }

  // service for deleting category
  deleteCategory(categoryDetail) {
    return this.http.post(
      "http://localhost:8080/deleteCategory",
      categoryDetail
    );
  }
}
