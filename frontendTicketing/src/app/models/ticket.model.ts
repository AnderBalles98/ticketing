import {UserModel} from "./user.model";
import {ProjectModel} from "./project.model";
import {UserStoryModel} from "./user.story.model";
import {TicketStateModel} from "./ticket.state.model";

export class TicketModel {

  public id: string;
  public name: string;
  public description: string;
  public display_id: number;
  public user_story: UserStoryModel;
  public created_at: string;
  public modified_at: string;
  public created_by: UserModel;
  public state: TicketStateModel;

  constructor(id: string = '', name: string = '', description: string = '', project: UserStoryModel = new UserStoryModel(),
              created_at: Date = new Date(), modified_at: Date = new Date(), created_by: UserModel = new UserModel(), display_id: number = 0,
              ticketState: TicketStateModel = new TicketStateModel()) {

    this.id = id;
    this.display_id = display_id;
    this.name = name;
    this.description = description;
    this.user_story = project;
    this.created_by = created_by;
    this.state = ticketState;

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


  static map(obj: any): TicketModel {
    let emptyUserStory = new TicketModel();
    obj = {
      ...emptyUserStory,
      ...obj
    }
    return new TicketModel(obj.id, obj.name, obj.description, UserStoryModel.map(obj.user_story), obj.created_at,
      obj.modified_at, UserModel.map(obj.created_by), obj.display_id, TicketStateModel.map(obj.state))
  }

}
