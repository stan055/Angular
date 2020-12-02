import { Role } from 'src/app/models/role';

export class User {
    email: string;
    username: string;
    role: Role;
    uid: string;

    constructor(e, u = '', r = Role.unauthorized, uid = '') {
        this.email = e;
        this.username = u;
        this.role = r;
        this.uid = uid;
    }
}
