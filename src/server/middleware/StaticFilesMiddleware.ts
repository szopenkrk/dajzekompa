/* Libraries */
import express from 'express';

/* Application files */
import Config from '../lib/config';

export default function () {
    return [ '/static', express.static(`${Config.NODE_ENV === 'development' ? 'build/' : ''}static/`) ];
}
