export interface personList{
    total?:Number,
    page?:Number,
    limit?:Number,
    Data?:DataInterface[],
}

export interface DataInterface{
    id?:Number,
    title?:String,
    firstName?:String,
    lastName?:String,
    picture?:String

}