export interface BaseController<T> {
    getOne (id: string) : Promise<T>;
    getAll (): Promise<T[]>;
    update (id: string, values: T): Promise<T>
    delete (id: string): Promise<T>;
    create (values: T): Promise<T>;
}