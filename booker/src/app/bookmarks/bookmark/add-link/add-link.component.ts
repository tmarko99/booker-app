import { Bookmark, UpdateBookmarkGQL, BookmarkDocument } from './../../../../generated-types';
import { FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss']
})
export class AddLinkComponent implements OnInit {
  link = new FormControl('', [Validators.required]);

  constructor(
    private readonly updateBookmarkGql: UpdateBookmarkGQL,
    @Inject(MAT_DIALOG_DATA) private readonly data: { bookmark: Bookmark },
    private readonly dialogRef: MatDialogRef<AddLinkComponent>
  ) { }

  ngOnInit(): void {
  }

  getLinkError() {
    if (this.link.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  addLink() {
    this.updateBookmarkGql.mutate({
      updateBookmarkInput: {
        _id: this.data.bookmark._id,
        links: [...this.data.bookmark.links, this.link.value]
      }
    },
    {
      refetchQueries: [{
        query: BookmarkDocument,
        variables: { _id: this.data.bookmark._id },
      }]
    }).subscribe(() => {
      this.dialogRef.close();
    })
  }

}
