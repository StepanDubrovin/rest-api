export interface IUser {
    id: number; 
    name: string;
    role: 'admin' | 'master' | 'client';
}