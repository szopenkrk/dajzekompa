/* Libraries */
import jose from 'node-jose';

/* Application files */
import Config from 'server/lib/config';
import { getPublicKeys } from 'server/lib/gcloud';

export class OAuth {
    public keystore: jose.JWK.KeyStore = null;
    public onLoaded: Promise<void>;

    constructor () {
        this.onLoaded = this.initialLoad();
    }

    public async loadPublicKeys (): Promise<void> {
        this.keystore = jose.JWK.createKeyStore();

        const keys = await getPublicKeys();
        const adders = keys.map((pk) => {
            return this.keystore.add(pk.pem, 'pem');
        });

        await Promise.all(adders);
    }

    public getJwks () {
        return this.keystore.toJSON();
    }

    public createClaims () {
        return {
            iss: Config.API_URL,
            iat: null,
            exp: null
        };
    }

    private async initialLoad (): Promise<void> {
        return this.loadPublicKeys();
    }
}

export default new OAuth();
