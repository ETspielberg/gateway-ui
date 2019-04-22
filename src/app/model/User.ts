export class User {

    constructor(
        public username: string,
        public email: string,
        public fullname: string,
        public password ?: string
    ) {}
}
