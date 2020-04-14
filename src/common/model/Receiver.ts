export type Receiver = {
    id?: string;
    personType: ReceiverPersonType;
    firstName: string;
    lastName: string;
    caretakerFirstName: string;
    caretakerLastName: string;
    email: string;
    phone: string;
    street: string;
    streetNumber: string;
    city: string;
    postcode: string;
    locker: string;
    school: string;
    grade: string;
    complete?: boolean;
    consentTap: number;
    consentInfc: number;
    consentSchv: number;
    consentCrtr?: number;
};

export enum ReceiverPersonType {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER'
}
