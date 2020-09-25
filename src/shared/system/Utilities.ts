import fs from 'fs';
import { Logger } from "winston";
import { LoggerFactory } from "../logging/LoggerFactory";

export class Utilities {
    public static readonly logger: Logger = LoggerFactory.getLogger('Utilities');

    public static delay(msec: number): Promise<any> {
        return new Promise<any>(resolve => setTimeout(resolve, msec));
    }

    /**
     * Checks that environment is Node JS.
     */
    public static isNode() {
        if (typeof process === 'object') {
            if (typeof process.versions === 'object') {
                if (typeof process.versions.node !== 'undefined') {
                    return true;
                }
            }
        }
        return false;
    }

    public static isFile(path: string) {
        return path && fs.statSync(path).isFile();
    }

    public static tryParseInt(str: string): number {
        if (!str) {
            return 0;
        }
        try {
            return parseInt(str);
        } catch {
            return 0;
        }
    }

    public static tryParseFloat(str: string): number {
        if (!str) {
            return 0.0;
        }
        try {
            return parseFloat(str);
        } catch {
            return 0.00;
        }
    }

    public static tryParseJson<T extends object>(str: string): T {
        try {
            let parseResult = JSON.parse(str) as T;
            if (!parseResult) {
                parseResult = JSON.parse(str);
            }
            return parseResult;
        } catch (error) {
            Utilities.logger.error(error?.message);
            return null;
        }
    }
}