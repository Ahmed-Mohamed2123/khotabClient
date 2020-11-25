import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-invalid-credential',
  templateUrl: './invalid-credential.component.html',
  styleUrls: ['./invalid-credential.component.scss']
})
export class InvalidCredentialComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<InvalidCredentialComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
