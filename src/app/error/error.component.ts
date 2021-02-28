import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  // selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  public message: string = 'An unknown error occurred'
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) { } // special token provided by angular material

  ngOnInit(): void {
  }

}
