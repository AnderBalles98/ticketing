import {ProjectModel} from "./project.model";
import {UserModel} from "./user.model";

export class TicketStateModel {


  constructor(public id: number = 1, public name: string = '', public description: string = '')
    {}

  static map(obj: any): TicketStateModel {
    let emptyUserStory = new TicketStateModel();
    obj = {
      ...emptyUserStory,
      ...obj
    }
    return new TicketStateModel(obj.id, obj.name, obj.description)
  }

}
