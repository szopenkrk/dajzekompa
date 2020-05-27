// /* Libraries */
// import joi from '@hapi/joi';
// import multer from 'multer';
// import { v4 as uuid } from 'uuid';
// import mime from 'mime-types';
// import { Storage } from '@google-cloud/storage';

// /* Models */
// import { Request, Response } from 'express';
// import { Device, DeviceStatus, DeviceType, DevicePersonType } from 'common/model/Device';
// import { closeWithError, respondSuccess, validateRequestPayload } from 'server/lib/http';
// import { APIRoute } from 'server/model/API';
// import { HTTPCode, HTTPMethod } from 'server/model/HTTP';
// import { DBSchemaDevice, DBTable } from 'server/model/DB';

// export default {
//     method: HTTPMethod.POST,
//     url: '/api/multipleDevice/add',
//     controller: async (req: Request, res: Response) => {

//         return respondSuccess(res, device);
//     }
// } as APIRoute;