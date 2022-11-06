import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksResolver } from './links.resolver';

@Module({
  providers: [LinksService, LinksResolver]
})
export class LinksModule {}
