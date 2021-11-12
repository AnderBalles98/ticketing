import {CompanyModel} from "./company.model";
import {UserModel} from "./user.model";

export class ProjectModel {
  constructor(public id: string, public name: string, public description: string,
              public company: CompanyModel, public created_at: string, public modified_at: string,
              public created_by: UserModel)

  {
    let m = new Date(created_at);
    let dateString =
      m.getUTCFullYear() + "-" +
      ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
      ("0" + m.getUTCDate()).slice(-2) + " " +
      ("0" + m.getUTCHours()).slice(-2) + ":" +
      ("0" + m.getUTCMinutes()).slice(-2) + ":" +
      ("0" + m.getUTCSeconds()).slice(-2);
    this.created_at = dateString;

    m = new Date(modified_at);
    dateString =
      m.getUTCFullYear() + "-" +
      ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
      ("0" + m.getUTCDate()).slice(-2) + " " +
      ("0" + m.getUTCHours()).slice(-2) + ":" +
      ("0" + m.getUTCMinutes()).slice(-2) + ":" +
      ("0" + m.getUTCSeconds()).slice(-2);
    this.modified_at = dateString;
  }

  static map(obj: any): ProjectModel {
    let date = new Date();
    console.log(date.toLocaleDateString())
    return new ProjectModel(obj.id, obj.name, obj.description, CompanyModel.map(obj.company), obj.created_at,
      obj.modified_at, UserModel.map(obj.created_by))
  }

}
