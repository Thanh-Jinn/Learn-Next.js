export interface IUser {
    id?: number;
    username?: string;
    avatar?: string;
}

export interface IPagin {
    totalCount : number;
    limit: 1;
}