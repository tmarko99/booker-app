/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
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

  async find(filterQuery: FilterQuery<T>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
        throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndUpdate(filterQuery: FilterQuery<T>, update: UpdateQuery<T>) {
    const document = this.model.findOneAndUpdate(filterQuery, update, { lean: true, new: true });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>) {
    const document = this.model.findOneAndDelete(filterQuery, { lean: true });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }
}
