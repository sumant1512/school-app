import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ErrorMessageDialogComponent } from "./error-message-dialog.component";

@Injectable({
  providedIn: "root"
})
export class ErrorDialogFunctionsService {
  constructor(private dialog: MatDialog) {}

  openErrorDialog(errorMessage: string) {
    const dialogRef = this.dialog.open(ErrorMessageDialogComponent, {
      width: "750px",
      data: { message: errorMessage }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog closed");
    });
  }
}
