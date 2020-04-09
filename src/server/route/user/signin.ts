/* Libraries */
import joi from '@hapi/joi';
import jose from 'node-jose';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

/* Models */
import { Request, Response } from 'express';
import { User } from 'common/model/User';
import { APIRoute } from 'server/model/API';
import { DBSchemaUser, DBTable } from 'server/model/DB';
import { HTTPMethod, HTTPCode } from 'server/model/HTTP';

/* Application files */
import knex from 'server/database/knex';
import Config from 'server/lib/config';
import { respondSuccess, validateRequestPayload } from 'server/lib/http';
import { sign, getNewestPublicKey } from 'server/lib/gcloud';
import APIError from 'server/controller/APIError';

const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

const client = jwksClient({
    jwksUri: new URL('/jwks', Config.API_URL).toString()
});

async function getUserFromDatabase (email: string, password?: string): Promise<DBSchemaUser> {
    const result = await knex(DBTable.USERS).select('*').where('email', email).andWhere('password', password);

    if (!result.length) throw new APIError('Niepoprawne dane.', HTTPCode.UNAUTHORIZED);

    return result[0];
}

async function getUserByEmail (email: string): Promise<DBSchemaUser> {
    const result = await knex(DBTable.USERS).select('*').where('email', email);

    if (!result.length) throw new APIError('Niepoprawne dane.', HTTPCode.UNAUTHORIZED);

    return result[0];
}

// async function createUserToken (user: DBSchemaUser): Promise<string> {
//     const pk = await getNewestPublicKey();
//     const jwk = await jose.JWK.asKey(pk.pem, 'pem');
//     const kid = jwk.kid;
//     const header = {
//         alg: 'RS512',
//         jku: new URL('/jwks', Config.API_URL).toString(),
//         kid
//     };
//     const claims = {
//         iss: Config.API_URL,
//         iat: Math.floor(Date.now() / 1000),
//         exp: Math.floor((Date.now() + Config.AUTH_TOKEN_TTL * 1000) / 1000),
//         email: user.email
//     };
//     const headerString = Buffer.from(JSON.stringify(header)).toString('base64');
//     const claimsString = Buffer.from(JSON.stringify(claims)).toString('base64');
//     const message = `${headerString}.${claimsString}`;
//     const signature = await sign(message, Config.GOOGLE_KMS_KEY_VERSION);

//     return `${message}.${signature}`;
// }

export class JWT {
    public signature: string = '';
    public raw: string;

    public alg: string;
    public jku: string;
    public kid: string;
    public typ: string;

    public iss: string;
    public iat: number;
    public exp: number;

    public email: string;

    public async sign () {
        this.iat = Math.floor(Date.now() / 1000);
        this.exp = Math.floor((Date.now() + Config.AUTH_TOKEN_TTL * 1000) / 1000);

        const headerRaw = Buffer.from(JSON.stringify(this.getHeader())).toString('base64');
        const claimsRaw = Buffer.from(JSON.stringify(this.getClaims())).toString('base64');
        const message = `${headerRaw}.${claimsRaw}`;

        this.signature = await sign(message, Config.GOOGLE_KMS_KEY_VERSION);
    }

    public async verify (): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            jwt.verify(this.raw, (header, callback) => {
                client.getSigningKey(this.kid, (err, key) => {
                    const signingKey: string = (key as any).publicKey || (key as any).rsaPublicKey;

                    callback(null, signingKey);
                })
            }, {}, (err) => {
                console.log(err);
                if (err) return resolve(false);

                return resolve(true);
            });
        });
    }

    public getHeader () {
        return {
            alg: this.alg,
            jku: this.jku,
            kid: this.kid
        };
    }

    public encodeHeader () {
        return Buffer.from(JSON.stringify(this.getHeader())).toString('base64');
    }

    public getClaims () {
        return {
            iss: this.iss,
            iat: this.iat,
            exp: this.exp,
            email: this.email
        };
    }

    public encodeClaims (): string {
        return Buffer.from(JSON.stringify(this.getClaims())).toString('base64');
    }

    public toString (): string {
        return [ this.encodeHeader(), this.encodeClaims(), this.signature ].join('.');
    }

    static async create (email: string): Promise<JWT> {
        const pk = await getNewestPublicKey();
        const jwk = await jose.JWK.asKey(pk.pem, 'pem');
        const kid = jwk.kid;

        const t = new JWT();

        t.signature = '';
        t.raw = '';

        t.alg = 'RS512';
        t.jku = new URL('/jwks', Config.API_URL).toString()
        t.kid = kid;
        t.typ = 'JWT';

        t.iss = Config.API_URL;
        t.iat = 0;
        t.exp = 0;

        t.email = email;

        return t;
    }

    static fromString (token: string): JWT {
        const [ headerRaw, claimsRaw, signature ] = token.split('.');
        const header = JSON.parse(Buffer.from(headerRaw, 'base64').toString());
        const claims = JSON.parse(Buffer.from(claimsRaw, 'base64').toString());

        const t = new JWT();

        t.signature = signature;
        t.raw = token;

        t.alg = header.alg;
        t.jku = header.jku;
        t.kid = header.kid;
        t.typ = header.typ;

        t.iss = claims.iss;
        t.iat = claims.iat;
        t.exp = claims.exp;

        t.email = claims.email;

        return t;
    }
}

export default {
    method: HTTPMethod.POST,
    url: '/api/users/signin',
    controller: async (req: Request, res: Response) => {
        const header = req.header('Authorization');

        if (header && header.startsWith('Bearer ')) {
            const raw = header.replace(/^Bearer /g, '');
            const token = JWT.fromString(raw);
            const valid = await token.verify();

            if (!valid) throw new APIError('Invalid token.', HTTPCode.UNAUTHORIZED);

            const user = await getUserByEmail(token.email);

            return respondSuccess(res, {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: token.raw
            });
        }

        req.body = await validateRequestPayload(req.body, schema);

        const user = await getUserFromDatabase(req.body.email, req.body.password);
        const token = await JWT.create(user.email);
        await token.sign();

        const response: User = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: token.toString()
        };

        return respondSuccess(res, response);
    }
} as APIRoute;
