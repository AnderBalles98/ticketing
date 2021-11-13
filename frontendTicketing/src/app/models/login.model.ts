export class LoginModel {
  constructor(public username: string = '',
    public password: string = '')
    {}

  static map(object: any): LoginModel {
    return new LoginModel(object.username, object.password)
  }

}
