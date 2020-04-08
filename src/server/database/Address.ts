export default class Address {
    street: string;
    streetNumber: string;
    postcode: string;
    city: string;

    constructor (raw: Partial<Address>) {
        this.street = raw.street;
        this.streetNumber = raw.streetNumber;
        this.postcode = raw.postcode;
        this.city = raw.city;
    }

    toJson () {
        return {
            street: this.street,
            streetNumber: this.streetNumber,
            postcode: this.postcode,
            city: this.city
        };
    }
}
