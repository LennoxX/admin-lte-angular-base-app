export class Response<T> {
   
    public error?: Array<string>;
    public status?: string;

    constructor( public data: T) {}
}