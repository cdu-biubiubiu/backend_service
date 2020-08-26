import { prop, getModelForClass } from '@typegoose/typegoose';

type Competence = 'superAdministrator' | 'administrator' | 'articlePublisher';
class User {
  @prop({ type: String })
  public username: string;

  @prop({ type: String })
  public password: string;

  @prop({ type: String })
  public competence: Competence;

  constructor(username: string, password: string, competence: Competence) {
    this.username = username;
    this.password = password;
    this.competence = competence;
  }
}

const UserModel = getModelForClass(User);

export { UserModel };
