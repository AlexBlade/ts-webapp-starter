/**
 * Reflects an object that could be extended by defining properties that have string keys and values with T-type.
 */
export interface ITypedExtendable<T> {
    [key: string]: T;
}