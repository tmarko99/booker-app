import { UpdateBookmarkInput } from './dto/input/update-bookmark.input.dto';
import { User } from './../users/models/user.model';
import { CreateBookmarkInput } from './dto/input/create-bookmark.input.dto';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './models/bookmark.model';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GetBookmarkArgs } from './dto/args/get-bookmark.args.dto';
import { DeleteBookmarkInput } from './dto/input/delete-bookmark.input.dto';

@Resolver(() => Bookmark)
export class BookmarksResolver {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bookmark)
  createBookmark(
    @Args('createBookmarkInput') createBookmarkInput: CreateBookmarkInput,
    @CurrentUser() user: User,
  ) {
    return this.bookmarksService.createBookmark(createBookmarkInput, user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bookmark)
  updateBookmark(
    @Args('updateBookmarkInput') updateBookmarkInput: UpdateBookmarkInput,
    @CurrentUser() user: User,
  ) {
    return this.bookmarksService.updateBookmark(updateBookmarkInput, user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bookmark)
  deleteBookmark(
    @Args('deleteBookmarkInput') deleteBookmarkInput: DeleteBookmarkInput,
    @CurrentUser() user: User,
  ) {
    return this.bookmarksService.deleteBookmark(deleteBookmarkInput, user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bookmark], { name: 'bookmarks' })
  getBookmarks(@CurrentUser() user: User) {
    return this.bookmarksService.getBookmarks(user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Bookmark, { name: 'bookmark' })
  getBookmark(
    @Args() getBookmarkArgs: GetBookmarkArgs,
    @CurrentUser() user: User,
  ) {
    return this.bookmarksService.getBookmark(getBookmarkArgs, user._id);
  }
}
