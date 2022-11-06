import { CreateBookmarkGQL, BookmarksDocument } from './../../../generated-types';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-bookmark',
  templateUrl: './create-bookmark.component.html',
  styleUrls: ['./create-bookmark.component.scss']
})
export class CreateBookmarkComponent implements OnInit {
  bookmarkName = new FormControl('', [Validators.required]);

  constructor(
    private readonly createBookmarkGql: CreateBookmarkGQL,
    private readonly dialogRef: MatDialogRef<CreateBookmarkComponent>
  ) { }

  ngOnInit(): void {
  }

  getBookmarkNameError() {
    if (this.bookmarkName.hasError('required')) {
      return 'You must enter a value.';
    }

    return '';
  }

  createBookmark() {
    this.createBookmarkGql
    .mutate({
      createBookmarkInput: { name: this.bookmarkName.value }
    },
    {
      refetchQueries: [{
        query: BookmarksDocument
      }]
    })
    .subscribe(() => {
      this.dialogRef.close();
    })
  }

}
