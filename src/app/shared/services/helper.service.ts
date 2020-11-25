import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private dialog: MatDialog,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar) { }

  // Showing Dialogs
  openDialog(template: TemplateRef<any>) {
    this.dialog.open(template);
  }
  hideDialog() {
    this.dialog.closeAll();
  }

  // For Spinners
  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }

  // For toast messages
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
