/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<T extends AbstractDocument> {
  constructor(protected readonly model: Model<T>) {}

  async create(document: Omit<T, '_id'>): Promise<T> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save()).toJSON() as unknown as T;
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
        throw new NotFoundException('Document not found');
    }

    return document;
  }
}
