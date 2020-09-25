import mongoose, { ConnectionOptions } from "mongoose";
import { LoggerFactory } from "../shared/logging/LoggerFactory";
import { Utilities } from "../shared/system/Utilities";
import { ServerBase } from "./base/ServerBase";

export class WebServer extends ServerBase {
    private readonly logger = LoggerFactory.getLogger('WebServer');

    constructor() {
        super();
    }

    public async connectToStorage(connectionString: string): Promise<void> {
        if (!connectionString) {
            this.logger.error('Connection string was not provided, backend could not be started.');
            await Utilities.delay(5000)
            process.exit(1);
        }

        const options: ConnectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        this.logger.info('--------------- Establishing database connection ----------------');
        try {
            this.logger.info('Connecting to database');
            await mongoose.connect(connectionString, options);
            this.logger.info('MongoDB is online');
        } catch (error) {
            this.logger.error(`Could not connect to the database, here is the reason: ${error.message}`);
            process.exit(2);
        }
    }
}
