import { Document } from 'mongoose';
import { IEntityInfo } from './IEntityInfo';

export interface IEntity extends IEntityInfo, Document {}
