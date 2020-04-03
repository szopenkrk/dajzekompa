/* Application files */
import render from './render';
import device from './device';
import receiver from './receiver';
import program from './program';
import status from './status';

export default [
    ...device,
    ...receiver,
    program,
    render,
    status
];
