// Novo Usuário
export interface newUserModel {
    UUID: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    imageLink: string,
    isAdmin: boolean;
    isAuthor: boolean;
    terms: boolean;
}

// Usuário da API (para update/put)
export interface ApiUserModel {
    UUID: string;
    email: string;
    isAdmin: boolean;
    isAuthor: boolean;
    name: string;
    role: string;
    terms: boolean;
    imageLink: string;
}

// Usuário Criado no Firebase
export interface CreatedUserModel {
    email: string;
    password: string;
}