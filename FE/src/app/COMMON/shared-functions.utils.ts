import { classListReturnType } from "./shared-function.type";
import { Inject, forwardRef } from '@angular/core';
import { ClassService } from '../STORE/class/api/class.service';

export class SharedFunctions {
  
  classList: classListReturnType;
  constructor(@Inject(forwardRef(() => ClassService)) private classService: ClassService){}

  // function to get class list
  fetchClass() {
    this.classService.fetchClass().subscribe(response => {
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
