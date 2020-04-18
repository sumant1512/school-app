import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from "@angular/forms";
import { AdminService } from "../+services/admin.service";
import { MatDialog } from "@angular/material";
import { AssignToClassType } from "../../COMMON/assign-dialog-common/assign-dialog.type";
import { AssignDialogCommonComponent } from "src/app/COMMON/assign-dialog-common/assign-dialog-common.component";
import { addSectionForm } from "./section.utils";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { SectionService } from "src/app/STORE/section/api/section.service";
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
  allSections: object[];
  spinner: boolean = false;
  assignData: AssignToClassType;

  constructor(
    private adminService: AdminService,
    private sectionService: SectionService,
    private dialog: MatDialog,
    private errorService: ErrorDialogFunctionsService
  ) {
    this.addSectionForm = addSectionForm();
  }

  ngOnInit() {
    this.getSections(); // to get section list on page load
  }

  // function to add section
  addSection() {
    var sectionDetail = this.addSectionForm.value;
    this.sectionService.addSection(sectionDetail).subscribe((response) => {
      if (response["status"] === true) {
        this.allSections = response["data"];
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to get section list
  getSections() {
    this.sectionService.fetchSection().subscribe((response) => {
      if (response["status"] === true) {
        this.allSections = response["data"];
        this.spinner = true;
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
  }

  // function to delete section
  deleteSection(sectionId) {
    var sectionDetail = {
      sectionId: sectionId,
    };
    this.adminService.deleteSection(sectionDetail).subscribe((response) => {
      if (response["status"] === true) {
        this.allSections = response["data"];
        this.errorService.openErrorDialog(response["message"]);
      } else {
        this.errorService.openErrorDialog(response["message"]);
      }
    });
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
