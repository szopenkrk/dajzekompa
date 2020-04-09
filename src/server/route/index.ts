/* Application files */
import render from './render';
import device from './device';
import receiver from './receiver';
import program from './program';
import lockers from './lockers';
import schools from './schools';
import status from './status';

export default [
    ...device,
    ...receiver,
    program,
    lockers,
    schools,
    render,
    status
];
