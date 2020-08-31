import { User } from 'src/app/pages/user/user.model';

export class RoleValidator {

    isSuscriptor(usu: User): boolean {
        return usu.role === 'SUSCRIPTOR';
    }

    isEditor(usu: User): boolean {
        return usu.role === 'EDITOR';
    }

    isAdmin(usu: User): boolean {
        return usu.role === 'ADMIN';
    }
}
