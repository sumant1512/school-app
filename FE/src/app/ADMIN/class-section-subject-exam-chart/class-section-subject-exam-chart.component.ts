import { ArrayDataSource } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { NestedTreeControl } from "@angular/cdk/tree";
import {
  ClassType,
  SectionType,
  ClassWithSectionType
} from "./class-section.type";
import { MatDialog } from "@angular/material";
import { AdminService } from "../services/admin.service";
import { classSectionTransform } from "./class-section-transform";
import { ErrorMessageDialogComponent } from "src/app/COMMON/error-message-dialog/error-message-dialog.component";

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: any[] = [
  {
    name: "Fruit",
    children: [{ name: "Apple" }, { name: "Banana" }, { name: "Fruit loops" }]
  },
  {
    name: "Vegetables",
    children: [{ name: "Broccoli" }, { name: "Brussels sprouts" }]
  }
];
@Component({
  selector: "app-class-section-subject-exam-chart",
  templateUrl: "./class-section-subject-exam-chart.component.html",
  styleUrls: ["./class-section-subject-exam-chart.component.css"]
})
export class ClassSectionSubjectExamChartComponent implements OnInit {
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new ArrayDataSource(TREE_DATA);

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;

  classList: ClassType[];
  spinner: boolean = false;
  classWithSection: SectionType[];
  message: string;
  classWithSectionTransformed: ClassWithSectionType[];
  // treeControl;
  // dataSource;
  hasChild1;
  constructor(public dialog: MatDialog, private adminService: AdminService) {}

  ngOnInit() {
    this.getClass();
  }

  // function to get class list
  getClass() {
    this.adminService.getClass().subscribe(response => {
      if (response["status"] === true) {
        this.classList = response["data"];
        this.getClassWithSection();
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // function to get class with section
  getClassWithSection() {
    this.adminService.getClassWithSection().subscribe(response => {
      if (response["status"] === true) {
        this.classWithSection = response["data"];
        this.classWithSectionTransformed = classSectionTransform(
          this.classList,
          this.classWithSection
        );
        this.spinner = true;
        this.treeControl = new NestedTreeControl<any>(node => node);
        this.dataSource = new ArrayDataSource(this.classWithSectionTransformed);
        this.hasChild1 = (_: number, node: any) =>
          !!node.sections && node.sections.length > 0;
          console.log("55555555555555555",this.dataSource);
      } else {
        this.openDialog(response["message"]);
      }
    });
  }

  // Error message dialog
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
