import {UserModel} from "./user.model";
import {ProjectModel} from "./project.model";

export class UserStoryModel {

  public id: string;
  public name: string;
  public description: string;
  public display_id: number;
  public project: ProjectModel;
  public created_at: string;
  public modified_at: string;
  public created_by: UserModel;


  constructor(id: string = '', name: string = '', description: string = '', project: ProjectModel = new ProjectModel(),
              created_at: Date = new Date(), modified_at: Date = new Date(), created_by: UserModel = new UserModel(), display_id: number = 0) {

    this.id = id;
    this.display_id = display_id;
    this.name = name;
    this.description = description;
    this.project = project;
    this.created_by = created_by;

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


  static map(obj: any): UserStoryModel {
    let emptyUserStory = new UserStoryModel();
    obj = {
      ...emptyUserStory,
      ...obj
    }
    return new UserStoryModel(obj.id, obj.name, obj.description, ProjectModel.map(obj.company), obj.created_at,
      obj.modified_at, UserModel.map(obj.created_by), obj.display_id)
  }

}
