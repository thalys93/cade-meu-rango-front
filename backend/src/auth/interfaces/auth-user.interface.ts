import { Roles } from 'src/enums/Roles';

export interface AuthUser {
    id: string;
    email: string;
    name?: string;
    roles: Roles[];
}
