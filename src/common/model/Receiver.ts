export type Receiver = {
    id?: string;
    personType: ReceiverPersonType;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    streetNumber: string;
    city: string;
    postcode: string;
    locker: string;
    school: string;
    complete: boolean;
};

export enum ReceiverPersonType {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER'
}
