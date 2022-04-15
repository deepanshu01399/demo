export interface personList{
    total?:number,
    page?:number,
    limit?:number,
    Data?:DataInterface[],
}

export interface DataInterface{
    id?:number,
    title?:string,
    firstName?:string,
    lastName?:string,
    picture?:string

}