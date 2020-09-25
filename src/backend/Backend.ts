import { Configuration } from '@bpnet/unicon';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ejs from "ejs";
import { Application } from "express";
import * as ValidationSchema from '../shared/configuration/schemas/ConfigurationSchema.json';
import { LoggerFactory } from "../shared/logging/LoggerFactory";
import { CommandLineParameters } from "../shared/system/CommandLineParameters";
import { EntityController } from './controllers/api/EntityController';
import { WebServer } from "./WebServer";

const defaultConfigName = 'backend.json';
const cmdLineParams = CommandLineParameters.getInstance();

const config = cmdLineParams.getAsString('config') || defaultConfigName;
const configuration = new Configuration({validationSchema: ValidationSchema, uri: config, loadImmediately: true});
const connectionString = configuration.get("$.configuration.storage.connectionString");
const bindTo = configuration.get("$.configuration.backend.bind");
const content = configuration.get("$.configuration.backend.contentLocation");
const server = new WebServer();
const logger = LoggerFactory.getLogger('Backend');

server.connectToStorage(connectionString).then(() => {
    server.listen(bindTo)
        .use(cookieParser())
        .use(bodyParser.urlencoded({extended: false}))
        .use(bodyParser.json())
        .tuneApplication((app: Application) => {
            ejs.openDelimiter = '{{';
            ejs.closeDelimiter = '}}';
            app.set('views', content);
            app.engine('html', ejs.renderFile);
            app.set('view engine', 'html');
        })
        .withControllers([
            EntityController
        ])
        .withStaticFolders([content])
        .onStart(() => {
            logger.info(`Spider backend/API server started on ${server.port}`);
        })
        .outRuntimeInfo()
        .start();
});

