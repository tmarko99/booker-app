import { BookmarkDocument } from './models/bookmark.schema';
import { BookmarksRepository } from './bookmarks.repository';
import { Injectable } from '@nestjs/common';
import { CreateBookmarkInput } from './dto/input/create-bookmark.input.dto';
import { GetBookmarkArgs } from './dto/args/get-bookmark.args.dto';
import { UpdateBookmarkInput } from './dto/input/update-bookmark.input.dto';
import { DeleteBookmarkInput } from './dto/input/delete-bookmark.input.dto';

@Injectable()
export class BookmarksService {
  constructor(private readonly bookmarkRepository: BookmarksRepository) {}

  async createBookmark(
    createBookmarkInput: CreateBookmarkInput,
    userId: string,
  ) {
    const bookmarkDocument = await this.bookmarkRepository.create({
      ...createBookmarkInput,
      links: [],
      userId,
    });

    return this.toModel(bookmarkDocument);
  }

  async updateBookmark(
    updateBookmarkInput: UpdateBookmarkInput,
    userId: string,
  ) {
    const updatedDocument = await this.bookmarkRepository.findOneAndUpdate(
      {
        _id: updateBookmarkInput._id,
        userId,
      },
      updateBookmarkInput,
    );

    return this.toModel(updatedDocument);
  }

  async deleteBookmark(
    deleteBookmarkInput: DeleteBookmarkInput,
    userId: string,
  ) {
    const bookmarkDocument = await this.bookmarkRepository.findOneAndDelete({
      ...deleteBookmarkInput,
      userId,
    });

    return this.toModel(bookmarkDocument);
  }

  async getBookmarks(userId: string) {
    const bookmarkDocuments = await this.bookmarkRepository.find({ userId });

    return bookmarkDocuments.map((bookmark) => this.toModel(bookmark));
  }

  async getBookmark(getBookmarkArgs: GetBookmarkArgs, userId: string) {
    const bookmarkDocument = await this.bookmarkRepository.findOne({
      ...getBookmarkArgs,
      userId,
    });

    return this.toModel(bookmarkDocument);
  }

  private toModel(bookmarkDocument: BookmarkDocument) {
    return {
      _id: bookmarkDocument._id.toHexString(),
      ...bookmarkDocument,
    };
  }
}
