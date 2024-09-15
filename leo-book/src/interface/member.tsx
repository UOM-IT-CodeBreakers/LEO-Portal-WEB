export interface  Member {
    _id?: string;
    name:string;
    mobile: string;
    faculty: string;
    batch: number;
    district: string;
    email: string,
    password: string,
    addedDate?: Date,
    addedBy: string,
    ratings?: number
}