import { MongooseFilterQuery, MongooseUpdateQuery } from "mongoose";
import { IEntity } from '../../interfaces/channels/IEntity';
import { IEntityInfo } from '../../interfaces/channels/IEntityInfo';
import { IExtendable } from "../../interfaces/common/IExtendable";
import { LoggerFactory } from "../../logging/LoggerFactory";
import { CollectionBase } from './base/CollectionBase';

export class Entities extends CollectionBase<IEntity>{
    private static collectionName: string = 'entities';
    protected readonly logger = LoggerFactory.getLogger(Entities.collectionName);

    constructor() {
        super(
            Entities.collectionName,
            {
                name: { type: String, required: true },
                description: { type: Number, required: false, default: '' },
            }
        );
    }

    public async create(info: IEntityInfo): Promise<IEntity> {
        try {
            return await this.model.create(info);
        } catch (error) {
            this.logger.error(error.message);
            return null;
        }
    }

    public async update(proxy: IEntity, proxyInfo: MongooseUpdateQuery<IEntity>): Promise<IEntity> {
        try {
            await this.model.updateOne({ _id: proxy._id}, proxyInfo);
            return await this.model.findOne({ _id: proxy._id});
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }

    public async find(filter?: MongooseFilterQuery<IEntity>, order?: string, start?: number, count?: number): Promise<IEntity[]> {
        try {
            let qry = this.model.find(filter);
            if (order) {
                const orderExpression: IExtendable = {};
                orderExpression[order] = 1;
                qry = qry.sort(orderExpression);
            }
            if (start)
                qry = qry.skip(start);
            if (count)
                qry = qry.limit(count);
            return await qry;
        } catch (error) {
            this.logger.error(error);
            return null
        }
    }

    public async count(filter?: MongooseFilterQuery<IEntity>): Promise<number> {
        try {
            return await this.model.countDocuments(filter ?? {});
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }
}