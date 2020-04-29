/* Application files */
import render from './render';
import device from './device';
import receiver from './receiver';
import photo from './photo';
import program from './program';
import lockers from './lockers';
import schools from './schools';
import status from './status';

export default [
    ...device,
    ...receiver,
    ...photo,
    program,
    lockers,
    schools,
    render,
    status
];
