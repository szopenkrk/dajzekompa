/* Libraries */
import mime from 'mime-types';
import { v4 as uuid } from 'uuid';
import { Storage } from '@google-cloud/storage';

/* Application files */
import Config from 'server/lib/config';

const storage = new Storage({ keyFilename: Config.GOOGLE_APPLICATION_CREDENTIALS });
const bucket = storage.bucket(Config.GOOGLE_STORAGE_BUCKET);

export async function uploadFiles (files: Express.Multer.File[]): Promise<string[]> {
    const uploads = (files).map((file) => {
        return new Promise<string>((resolve, reject) => {
            const object = bucket.file(`${uuid()}.${mime.extension(file.mimetype)}`);
            const stream = object.createWriteStream({ resumable: false });

            stream.on('finish', async () => {
                await object.makePublic();

                return resolve(`https://storage.googleapis.com/${Config.GOOGLE_STORAGE_BUCKET}/${object.name}`);
            }).on('error', (error) => {
                return reject(`Failed to upload files to GCloud: ${error.message}`);
            }).end(file.buffer);
        });
    });

    return Promise.all<string>(uploads);
}
