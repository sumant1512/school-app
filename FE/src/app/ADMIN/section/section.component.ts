import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AdminService } from "../+services/admin.service";
import { MatDialog } from "@angular/material";
import { AssignToClassType } from "../../COMMON/assign-dialog-common/assign-dialog.type";
import { AssignDialogCommonComponent } from "src/app/COMMON/assign-dialog-common/assign-dialog-common.component";
import { addSectionForm } from "./section.utils";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { SectionService } from "src/app/STORE/section/api/section.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/STORE/app.state";
import * as SectionActions from "../../STORE/section/section.actions";

export interface MessageDialog {
  message: string;
}

@Component({
  selector: "app-section",
  templateUrl: "./section.component.html",
  styleUrls: ["./section.component.css"],
})
export class SectionComponent implements OnInit {
  addSectionForm: FormGroup;
  sectionList: object[];
  spinner: boolean = false;
  assignData: AssignToClassType;

  constructor(
    private adminService: AdminService,
    private sectionService: SectionService,
    private dialog: MatDialog,
    private errorService: ErrorDialogFunctionsService,
    private store: Store<AppState>
  ) {
    this.addSectionForm = addSectionForm();
  }

  ngOnInit() {
    this.fetchSections(); // to fetch section list on page load
  }

  // function to reset class form
  resetForm() {
    this.addSectionForm.reset();
    this.addSectionForm.markAsUntouched();
  }

  // function to add section
  addSection() {
    var sectionDetail = this.addSectionForm.value;
    this.store.dispatch(new SectionActions.AddSection(sectionDetail));
    this.resetForm();
  }

  // function to fetch section list
  fetchSections() {
    this.store.dispatch(new SectionActions.FetchSection());
    this.store.select("sectionList").subscribe((response) => {
      this.sectionList = response.sectionList;
      this.spinner = true;
    });
  }

  // function to delete section
  deleteSection(sectionId) {
    var sectionDetail = {
      sectionId: sectionId,
    };
    this.store.dispatch(new SectionActions.DeleteSection(sectionDetail));
    // this.adminService.deleteSection(sectionDetail).subscribe((response) => {
    //   if (response["status"] === true) {
    //     this.sectionList = response["data"];
    //     this.errorService.openErrorDialog(response["message"]);
    //   } else {
    //     this.errorService.openErrorDialog(response["message"]);
    //   }
    // });
  }

  // function to assign section to class
  assignSection(sectionId, sectionName) {
    this.assignData = {
      id_to_be_assinged: sectionId,
      name_to_be_assinged: sectionName,
      property_to_be_assinged: "section",
      table_name: "class_with_section",
      row_name: "section_id",
    };
    const dialogRef = this.dialog.open(AssignDialogCommonComponent, {
      width: "500px",
      data: this.assignData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Assign dialog closed");
    });
  }
}
