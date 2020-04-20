import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AdminService } from "../+services/admin.service";
import { ErrorDialogFunctionsService } from "src/app/COMMON/error-message-dialog/error-dialog-functions.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/STORE/app.state";
import * as HouseActions from "../../STORE/house/house.actions";
import { addHouseForm } from "./house.utils";

@Component({
  selector: "app-house",
  templateUrl: "./house.component.html",
  styleUrls: ["./house.component.css"],
})
export class HouseComponent implements OnInit {
  addHouseForm: FormGroup;
  houseList: object[];
  spinner: boolean = false;
  update: boolean = false;
  updateHouseId: number;

  constructor(
    private adminService: AdminService,
    private errorService: ErrorDialogFunctionsService,
    private store: Store<AppState>
  ) {
    this.addHouseForm = addHouseForm();
  }

  ngOnInit() {
    this.fetchHouse(); // to fetch house list on load page
  }

  // function to reset house form
  resetForm() {
    this.addHouseForm.reset();
    this.addHouseForm.markAsUntouched();
  }

  // function to call add or update
  house() {
    this.update ? this.updateHouse() : this.addHouse();
  }

  // function to add House
  addHouse() {
    var houseDetail = this.addHouseForm.value;
    this.store.dispatch(new HouseActions.AddHouse(houseDetail));
  }

  // function to update house
  updateHouse() {
    const houseDetail = {
      houseId: this.updateHouseId,
      houseName: this.addHouseForm.value.houseName,
    };
    this.store.dispatch(new HouseActions.UpdateHouse(houseDetail));
    this.resetForm();
  }

  // function to fetch House list
  fetchHouse() {
    this.store.dispatch(new HouseActions.FetchHouse());
    this.store.select("houseList").subscribe((response) => {
      this.houseList = response.houseList;
      this.spinner = true;
    });
  }

  // function to delete House
  deleteHouse(houseId) {
    var houseDetail = {
      houseId: houseId,
    };
    this.store.dispatch(new HouseActions.DeleteHouse(houseDetail));
  }

  // function to activate add or update
  addHouseFormOpen() {
    this.update = false;
    this.resetForm();
  }

  // function to edit house name
  editHouse(houseId, houseName) {
    this.update = true;
    this.updateHouseId = houseId;
    this.addHouseForm.get("houseName").setValue(houseName);
  }
}
