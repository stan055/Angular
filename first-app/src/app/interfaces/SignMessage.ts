import { User } from '../models/user';

export interface SignMessage {
    type: string;
    value: User;
}
