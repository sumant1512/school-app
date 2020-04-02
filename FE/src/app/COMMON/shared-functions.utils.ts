import { AdminService } from "../ADMIN/services/admin.service";
import { classListReturnType } from "./shared-function.type";
import { Inject, forwardRef } from '@angular/core';

export class SharedFunctions {
  
  classList: classListReturnType;
  constructor(@Inject(forwardRef(() => AdminService)) private adminService: AdminService){}

  // function to get class list
  getClass() {
    this.adminService.getClass().subscribe(response => {
      if (response["status"] === true) {
        this.classList.class = response["data"];
        this.classList.spinner = true;
        return this.classList; 
      } else {
        return response["message"];
      }
    });
  }
}
