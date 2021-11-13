export class UserModel {
  constructor(public id: string = '', public email: string = '', public username: string = '',
              public first_name: string = '', public last_name: string = '')
    {}

  static map(obj: any): UserModel {
    return new UserModel(obj.id, obj.email, obj.username, obj.first_name, obj.last_name)
  }

}
