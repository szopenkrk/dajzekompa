/* Application files */
import render from './render';
import device from './device';
import receiver from './receiver';
import user from './user';
import program from './program';
import jwks from './jwks';
import lockers from './lockers';
import schools from './schools';
import status from './status';

export default [
    ...device,
    ...receiver,
    ...user,
    program,
    jwks,
    lockers,
    schools,
    render,
    status
];
