import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from "src/app/ADMIN/+services/admin.service";

export function searchForm(): FormGroup {
  return new FormGroup({
    classId: new FormControl("", Validators.required),
    sectionId: new FormControl("", Validators.required),
  });
}

// export class CommonFuntion {
//   constructor(public adminService: AdminService) {}
//   getClass(): object[] {
//       let classList: object[]
//     this.adminService.getClass().subscribe((response) => {
//       if ((response["status"] = true)) {
//         classList = response["data"];
//       }
//     });
//     return classList;
//   }
// }
