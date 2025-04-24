import bcrypt from 'bcrypt';
import * as jose from 'jose';
import { EventoModel } from '../model/evento.model';

const secret = new TextEncoder().encode(process.env.SECRET);

export default class Auth {
    static async login(login: EventoModel | null, senha: string) {
        if(login==null) return { status: false, jwt: null }

        const match = await bcrypt.compare(senha, login.senha);
    
        if(!match) return { status: false, jwt: null }
    
        const jwt = await new jose.SignJWT({ 
            evento: { id: login.id, login: login.login }
        })
            .setProtectedHeader({ alg: process.env.ALGORITHM || 'HS256' })
            .setIssuedAt()
            .setExpirationTime(process.env.EXPIRATION_TIME || '30min')
            .sign(secret);
        return { status: match, jwt };
    }

    static async verifyToken(jwt: string) {
        try {
            const { payload } = await jose.jwtVerify(jwt, secret);
            return { status: true, payload };
        } catch(err) {
            return { status: false, payload: null }
        }
    }
}