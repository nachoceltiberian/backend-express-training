import { hash, compare } from "bcrypt";

/**
 * Contraseña sin encriptar
 * @param passwordPlain 
 */
export const encrypt = async (passwordPlain: string) => {
    const salt = 11;
    const hashPassword = await hash(passwordPlain, salt);
    return hashPassword;
};

export const comparePasswords = async (passwordPlain: string, hashPassword: string) => {
    return await compare(passwordPlain, hashPassword);
};
