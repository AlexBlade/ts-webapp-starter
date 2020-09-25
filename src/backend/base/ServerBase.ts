import { Server } from '@overnightjs/core';
import express, { Application } from 'express';
import { LoggerFactory } from "../../shared/logging/LoggerFactory";

/**
 * The Server Base class implements base functionality for HTTP server on top of express.js framework
 * and provides chainable configuration way to make server setup easy.
 */
export class ServerBase extends Server {

    /**
     * Logger for ServerBase class
     */
    private readonly sbLogger = LoggerFactory.getLogger('ServerBase');

    /**
     * Port that server will be bound to
     */
    private _port: number;
    get port(): number {
        return this._port;
    }

    private _name: string;
    private _onStart: () => void = () => { return; };

    /**
     * Constructor, it takes the only parameter - TCP port number to listen
     */
    constructor() {
        super();
    }

    public outRuntimeInfo(): this {
        this.sbLogger.info(`Server started from ${__dirname}`);
        return this;
    }

    /**
     * Facade to use express's use method for setting up middleware
     * @param args Arguments to pass to the express.use(...) method
     */
    public use(...args: any[]): this {
        this.app.use(...args);
        return this;
    }

    /**
     * Facade to use express's set method for setting up parameters
     * @param parameter Parameter's name
     * @param value Parameter's value
     */
    public set(parameter: string, value: any): this {
        this.app.set(parameter, value);
        return this;
    }

    /**
     * Setup port to listen
     * @param port
     */
    public listen(port: number): this {
        this._port = port;
        return this;
    }

    /**
     * Setup server name
     * @param name
     */
    public withName(name: string): this {
        this._name = name;
        return this;
    }

    /**
     * Setup server's controllers to work with
     * @param controllers Array of controllers' constructors
     */
    public withControllers<T extends new (...args: any[]) => {}>(controllers: T[]): this {
        super.addControllers(controllers.map((c) => new c(this)));
        return this;
    }

    /**
     * Adds static folder for the server
     * @param folders String array that contains folders' list
     */
    public withStaticFolders(folders: string[]): this {
        folders.forEach((f) => this.app.use(express.static(f)));
        return this;
    }

    /**
     * The method is used to make fine tuning of express application object. It takes
     * a callback function and passes into the function an application object to tune.
     * @param configure Callback function
     */
    public tuneApplication(configure: (app: Application) => void): this {
        configure(this.app);
        return this;
    }

    /**
     * Sets up a handler for server's start event
     * @param value
     */
    public onStart(value: () => void): this {
        this._onStart = value;
        return this;
    }

    /**
     * Starts the server and listen the port that was setup
     */
    public start(): this {
        this.app.listen(this._port, this._onStart);
        return this;
    }
}
