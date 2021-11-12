export class RegisterModel {
  constructor(public username: string = '', public password: string = '', public email: string = '',
              public first_name: string = '', public last_name: string = '')
    {}

  static map(obj: any): RegisterModel {
    return new RegisterModel(obj.username, obj.password, obj.email, obj.first_name, obj.last_name)
  }

}
