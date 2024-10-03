export enum Color {
    RED,
    BLACK,
    ORANGE,
    BROWN,
    BLUE
}

export enum Country {
    USA,
    GERMANY,
    CHINA,
    VATICAN,
    ITALY
}

export interface ILocation {
    x: number;
    y: number;
    name?: string;
}

export interface ICoordinates {
    x: number;
    y: number;
}

export class PersonRequestModel {
    public name!: string;
    public coordinates!: ICoordinates;
    public height!: number;
    public eyeColor!: Color;
    public hairColor!: Color;
    public nationality?: Country;
    public location?: ILocation;
}

export class PersonModel extends PersonRequestModel {
    public id!: number;
    public creationDate!: string;
}
