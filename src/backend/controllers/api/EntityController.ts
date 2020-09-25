import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { LoggerFactory } from '../../../shared/logging/LoggerFactory';

@Controller('api/entity')
export class EntityController {
    private readonly logger = LoggerFactory.getDefaultLogger();

    @Get('')
    public async count(request: Request, response: Response) {
        this.logger.debug(`Request: ${request.originalUrl}`);
        response.send({ name: 'Entity' });
    }
}