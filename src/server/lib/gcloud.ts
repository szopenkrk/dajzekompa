/* Libraries */
import { KeyManagementServiceClient } from '@google-cloud/kms';
import crypto from 'crypto';

/* Application files */
import Config from 'server/lib/config';

const client = new KeyManagementServiceClient();
const parent = client.locationPath(Config.GOOGLE_PROJECT_ID, Config.GOOGLE_KMS_LOCATION);

function getKeyPath (version: number = Config.GOOGLE_KMS_KEY_VERSION): string {
    return client.cryptoKeyVersionPath(
        Config.GOOGLE_PROJECT_ID,
        Config.GOOGLE_KMS_LOCATION,
        Config.GOOGLE_KMS_KEYRING,
        Config.GOOGLE_KMS_KEY_NAME,
        `${version}`
    );
}

export async function listKeys () {
    const [ keyRings ] = await client.listKeyRings({ parent });

    return keyRings;
}

export async function getNewestPublicKey () {
    const name = getKeyPath();
    const [ publicKey ] = await client.getPublicKey({ name });

    return { pem: publicKey.pem };
}

export async function getPublicKeys () {
    const name = getKeyPath();
    const [ publicKey ] = await client.getPublicKey({ name });

    return [
        { pem: publicKey.pem }
    ];
}

export async function sign (message: string, version: number) {
    const name = getKeyPath(version);
    const digest = crypto.createHash('RSA-SHA512');

    digest.update(message);

    const [ result ] = await client.asymmetricSign({
        name,
        digest: {
            sha512: digest.digest()
        }
    });

    return Buffer.from(result.signature).toString('base64')
}
