import { Router } from '@angular/router';
import { BookmarksGQL } from './../../generated-types';
import { Observable } from 'rxjs';
import { CreateBookmarkComponent } from './create-bookmark/create-bookmark.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Bookmark } from 'src/generated-types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  bookmarks$: Observable<Bookmark[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly bookmarksGql: BookmarksGQL,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.bookmarks$ = this.bookmarksGql
      .watch()
      .valueChanges.pipe(map((result) => result.data.bookmarks));
  }

  onFabClick() {
    this.dialog.open(CreateBookmarkComponent);
  }

  onBookmarkClick(bookmarkId: string) {
    this.router.navigate(['/bookmarks', bookmarkId]);
  }
}
