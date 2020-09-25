import { Document, FilterQuery } from 'mongoose';
import { LoggerFactory } from '../../../logging/LoggerFactory';
import { Utilities } from '../../../system/Utilities';
import { TAction } from '../../../types/TAction';
import { TFunctionAsync } from '../../../types/TFunctionAsync';
import { CollectionBase } from '../base/CollectionBase';

/**
 * Collection iteratior that introduces methods for collection element processing
 * with using certain handler which will be applied to every element.
 */
export class CollectionIterator<K extends Document> {
    private logger = LoggerFactory.getLogger('CollectionIterator');

    protected collection: CollectionBase<K>;
    protected filters: FilterQuery<K>;
    protected blockSize: number;
    protected sequenceMode: boolean;
    protected sequenceDelay: number;
    protected afterBlockCallback: TAction<number>;
    protected breakOnError: boolean;

    public static create<K extends Document>(collection: CollectionBase<K>): CollectionIterator<K> {
        return new CollectionIterator<K>(collection);
    }

    constructor(collection: CollectionBase<K>) {
        this.collection = collection;
        this.filters = <FilterQuery<K>>{};
        this.blockSize = 10;
        this.sequenceMode = false;
        this.sequenceDelay = 10000;
        this.breakOnError = false;
    }

    public filter(filters: FilterQuery<K>): this {
        this.filters = filters;
        return this;
    }

    public withBlockSize(size: number): this {
        this.blockSize = size;
        return this;
    }

    public useSequenceMode(delay: number = 10000): this {
        this.sequenceMode = true;
        this.sequenceDelay = delay;
        return this;
    }

    public withActionAfterEveryBlock(fn: TAction<number>): this {
        this.afterBlockCallback = fn;
        return this;
    }

    public breakOnActionError(): this {
        this.breakOnError = true;
        return this;
    }

    public async each(fn: TFunctionAsync<K, boolean>) {
        const totalCount = await this.collection.count(this.filters);
        const blockCount = Math.ceil(totalCount / this.blockSize);

        let cancel = false;

        for (let i = 1; i <= blockCount; i++) {
            const start = (i - 1) * this.blockSize + 1;
            const end = start + this.blockSize - 1;

            this.logger.debug(`Block ${i}, Range: ${start} - ${end}`);

            const documents = await this.collection.find(this.filters, null, start - 1, this.blockSize);

            // If sequenceMode is used then look through documents one-by-one applying action and making
            // delay (if it is defined) after every document.
            if (this.sequenceMode) {
                for (let j = 1; j <= documents.length; j++) {
                    try {
                        cancel = !(await fn(documents[j - 1], (i - 1) * this.blockSize + j));
                    } catch (error) {
                        cancel = true;
                        if (this.breakOnError)
                            break;
                    }

                    if (this.sequenceDelay > 0) {
                        await Utilities.delay(this.sequenceDelay);
                    }
                }

                if (this.afterBlockCallback) {
                    await this.afterBlockCallback(end);
                }
            // If no sequenceMode is used then perform action for all documents asynchronously and
            // wait for all action ending.
            } else {
                await Promise.all(documents.map(async (document, index) => {
                    return fn(document, (i - 1) * this.blockSize + index + 1);
                }));

                if (this.afterBlockCallback) {
                    await this.afterBlockCallback(end);
                }
            }

            if (cancel && this.breakOnError) {
                break;
            }
        }
    }
}
