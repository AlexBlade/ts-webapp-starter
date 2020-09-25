
const ALL_VALID_CMD_LINE_PARAMETERS = ['help', 'config', 'dry-run'];

export class CommandLineParameters {
    private static instance: CommandLineParameters;

    private readonly _params: Map<string, string>;
    get params(): Map<string, any> {
        return this._params;
    }

    constructor() {
        this._params = new Map<string, any>();
        this.parse();
    }

    private parse() {
        process.argv.forEach(arg => {
            const paramPair = arg.trim().split('=', 2);
            const name: string = paramPair[0].replace(/(--|\/)/g, '');
            const value: any = paramPair.length > 1 ? paramPair[1] : true;
            if (~ALL_VALID_CMD_LINE_PARAMETERS.indexOf(name)) {
                this._params.set(name, value);
            }
        });
    }

    public static getInstance(): CommandLineParameters {
        CommandLineParameters.instance = CommandLineParameters.instance ?? new CommandLineParameters();
        return CommandLineParameters.instance;
    }

    public exists(name: string): boolean {
        return this._params.has(name);
    }

    public get(name: string): any {
        return this._params.get(name);
    }

    public getAsString(name: string): string {
        return this.get(name)?.toString();
    }

    public getAsBoolean(name: string): boolean {
        const value = this.get(name);
        if (typeof value === 'boolean') {
            return value;
        } else {
            const strValue = value ? value.toString().toLowerCase() : 'false';
            if (strValue === '1' || strValue === 'true' || strValue ==='yes' || strValue === 'y') {
                return true
            } else if (strValue === '0' || strValue === 'false' || strValue ==='no' || strValue === 'n') {
                return false;
            } else {
                return false;
            }
        }
    }

    public getAsInteger(name: string): number {
        return this.exists(name) ? parseInt(this.get(name)) : 0;
    }

    public getAsFloat(name: string): number {
        return this.exists(name) ? parseFloat(this.get(name)) : 0.00;
    }
}
