import { GqlAuthGuard } from './../auth/guards/gql-auth.guard';
import { LinksService } from './links.service';
import { Link } from './models/link.model';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { GetLinksArgs } from './dto/args/get-links.args.dto';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Link)
export class LinksResolver {
  constructor(private readonly linkService: LinksService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Link], { name: 'links' })
  getLinks(@Args() getLinksArgs: GetLinksArgs) {
    return this.linkService.getLinks(getLinksArgs);
  }
}
