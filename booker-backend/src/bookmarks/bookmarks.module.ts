import { BookmarkSchema } from './models/bookmark.schema';
import { Bookmark } from './models/bookmark.model';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarksRepository } from './bookmarks.repository';
import { Module } from '@nestjs/common';
import { BookmarksResolver } from './bookmarks.resolver';
import { BookmarksService } from './bookmarks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bookmark.name,
        schema: BookmarkSchema,
      },
    ]),
  ],
  providers: [BookmarksResolver, BookmarksService, BookmarksRepository],
})
export class BookmarksModule {}
