import {UserModel} from "./user.model";
import {TicketModel} from "./ticket.model";

export class CommentModel {

  public id: string;
  public text: string;
  public ticket: TicketModel;
  public created_at: string;
  public modified_at: string;
  public created_by: UserModel;


  constructor(id: string = '', text: string = '', ticket: TicketModel = new TicketModel(),
              created_at: Date = new Date(), modified_at: Date = new Date(), created_by: UserModel = new UserModel()) {

    this.id = id;
    this.text = text;
    this.ticket = ticket;
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


  static map(obj: any): CommentModel {
    let emptyUserStory = new CommentModel();
    obj = {
      ...emptyUserStory,
      ...obj
    }
    return new CommentModel(obj.id, obj.text, TicketModel.map(obj.ticket), obj.created_at, obj.modified_at, UserModel.map(obj.created_by))
  }

}
