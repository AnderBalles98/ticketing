export class CompanyModel {
  constructor(public id:string = '', public name: string = '', public description: string = '',
              public address: string = '', public email: string = '', public nit: string = '',
              public phone: string = '')
  {}

  static map(obj: any): CompanyModel {
    return new CompanyModel(obj.id, obj.name, obj.description, obj.address, obj.email, obj.nit, obj.phone)
  }

}
