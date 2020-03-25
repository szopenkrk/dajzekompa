/* Models */
import { Request, Response } from 'express';
import { APIRoute } from '../model/API';
import { HTTPMethod } from '../model/HTTP';
import { AnyObject } from '../model/Object';
import { DocumentPlace } from '../model/Render';

/* Application files */
import Config from '../lib/config';

import template from '../../client/index.html';

function createScriptTagWithData (data: AnyObject, name: string): string {
    return `
        <script type="text/javascript" id="${name.toLowerCase()}-server-side">
            window.__${name.toUpperCase()}__ = ${JSON.stringify(data)};
        </script>
    `;
}

export function renderPartial (element: string, place: DocumentPlace, tpl: string) {
    const match = place.split('|').slice(0, 2);

    return tpl.replace(match.join(''), `${match[0]}${element}${match[1]}`);
}

export default {
    method: HTTPMethod.GET,
    url: '/*',
    controller: async (req: Request, res: Response) => {
        const config = Config.__CLIENT_ENABLED__.reduce((cfg, name) => {
            cfg[name] = Config[name];

            return cfg;
        }, {});

        const app = renderPartial(createScriptTagWithData(config, 'CONFIG'), DocumentPlace.HEAD, template);

        return res.send(app);
    }
} as APIRoute;
