import mongoose, { Document, FilterQuery, Model, Schema, SchemaDefinition, UpdateQuery } from "mongoose";
import { Logger } from 'winston';
import { IExtendable } from '../../../interfaces/common/IExtendable';
import { LoggerFactory } from '../../../logging/LoggerFactory';

/**
 * Remove from T all of mongoose owned fields and stay only schema definition fields.
 */
type Definition<T> = Pick<T, Exclude<keyof T, keyof Document>>;

/**
 * Class implements base collection prototype of generic MongoDb documents. A collection works as
 * a repository layer enabling base CRUD operations.
 */
export class CollectionBase<T extends Document> {
    protected readonly logger: Logger = LoggerFactory.getLogger('CollectionBase');

    /**
     * Mongoose model which provides various types of operations with document of T.
     */
    private readonly _model: Model<T>;
    get model(): Model<T> {
        return this._model;
    }

    /**
     * Base collection constructor.
     *
     * @param name Name of the collection.
     * @param definition Definition schema for a document type that will be stored in the collection.
     */
    constructor(name: string, definition: SchemaDefinition) {
        const schema = new Schema(definition);
        this._model = mongoose.models[name] || mongoose.model<T>(name, schema, name);
    }

    /**
     * Returns count of documents in the collection according to passed filters.
     *
     * @param filters Filters for appropriate documents collection
     */
    public async count(filters?: FilterQuery<T>): Promise<number> {
        try {
            return await this._model.countDocuments(filters ?? {});
        } catch (error) {
            this.logger.error(JSON.stringify(error));
            return 0;
        }
    }

    /**
     * Searches document by ID, returns document or null if document with passed ID was not found.
     *
     * @param id ID of a document to search
     */
    public async findById(id: string): Promise<T> {
        try {
            return await this._model.findOne(<FilterQuery<T>>{_id: id});
        } catch (error) {
            this.logger.error(JSON.stringify(error));
            return null;
        }
    }

    /**
     * Returns all document that match to passed filters. Orders document according to **order**
     * parameter. If **start** or **start** and **count** parameters are passed then takes only
     * [start..start+count] range of documents.
     *
     * @param filters Filters to apply
     * @param order Order expression
     * @param start Take documents starting from **start** position
     * @param count Take only **count** documents
     */
    public async find(filters: FilterQuery<T>, order?: string, start?: number, count?: number): Promise<T[]> {
        try {
            let query = this._model.find(filters);
            if (order) {
                const orderExpression: IExtendable = {};
                orderExpression[order] = -1;
                query = query.sort(orderExpression);
            }
            if (start)
                query = query.skip(start);

            if (count)
                query = query.limit(count);

            return await query;
        } catch (error) {
            this.logger.error(error);
            return null
        }
    }

    /**
     * FInd first document that matches with passed filters.
     *
     * @param filters
     */
    public async findOne(filters: FilterQuery<T>): Promise<T> {
        try {
            return await this._model.findOne(filters);
        } catch (error) {
            this.logger.error(JSON.stringify(error));
            return null;
        }
    }

    /**
     * Creates new document in the collection and returns the created one.
     *
     * @param document Document's definition object
     */
    public async create(document: Definition<T>): Promise<T | null> {
        try {
            return await this._model.create(document);
        } catch (error) {
            this.logger.error(JSON.stringify(error));
            return null;
        }
    }

        /**
     * Creates many new documents in the collection and returns the created one.
     *
     * @param document Documents definition objects
     */
    public async createMany(document: Definition<T>[]): Promise<T[] | null> {
        try {
            return await this._model.create(document);
        } catch (error) {
            this.logger.error(JSON.stringify(error));
            return null;
        }
    }

    /**
     * Updates an existing document and return an updated one.
     *
     * @param document
     * @param documentData
     */
    public async update(document: T, documentData: UpdateQuery<T>): Promise<T> {
        try {
            await this.model.updateOne({ _id: document._id }, documentData);
            return await this.model.findOne({ _id: document._id });
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }


}