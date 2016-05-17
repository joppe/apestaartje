export class Service {
    private identifier: string;
    private func: Function;

    constructor(identifier: string, func: Function, singleton: boolean = true) {
        this.identifier = identifier;
        this.func = func;
    }
}