export class Principal  {

  public authenticated: boolean;

    public name: string;

    public fullname?: string;

    public email?: string;

    public roles: string[];

    constructor(
      name: string,
      roles: string[],
      fullname: string,
      email: string
    ) {
      this.name = name;
      this.roles = roles;
      this.email = email;
      this.fullname = fullname;
      this.authenticated = false;
      if (roles.length > 0 ) {
        this.authenticated = true;
      }
    }

}
