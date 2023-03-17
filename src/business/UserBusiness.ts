import { UserInputDTO, LoginInputDTO, UserRole, User } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { 
  CustomError, 
  InvalidName, 
  InvalidEmail, 
  InvalidRole, 
  UserNotFound, 
  EmailNotFound } from './../error/BaseError';

const idGenerator = new IdGenerator();
const authenticator = new Authenticator();

export class UserBusiness {

  async createUser({ name, email, password, role }  : UserInputDTO) {
    
    try {
      if (!name || !email || !password || !role) {
        throw new CustomError(
          400,
          'Preencha os campos "name","nickname", "email", "password"e "role"'
        );
      }

      if (name.length < 4) {
        throw new InvalidName();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }
      
      if(role.toUpperCase() != UserRole.ADMIN && role.toUpperCase() != UserRole.NORMAL){
        throw new InvalidRole()
      }
      
      const id = idGenerator.generate();
      
      const user = new User(id, name, email, password, role as UserRole)
      
      const hashManager = new HashManager();
      const hashPassword = await hashManager.hash(user.getPassword());

      const userDatabase = new UserDatabase();
      await userDatabase.createUser(id, user.getEmail(), user.getName(), hashPassword, user.getRole());
      const token = authenticator.generateToken({ id, role: user.getRole() });

      return token
      
    } catch (error: any) {
        throw new CustomError(400, error.message);
    }
  }
  
  async loginUser({email, password}: LoginInputDTO) {

    if(!email || !password){
      throw new CustomError(
        400,
        'Preencha os campos "email" e "password"'
      );
    }

    if(!email.includes('@')){
      throw new InvalidEmail();
    }

    const userDatabase = new UserDatabase();
    const userFromDB = await userDatabase.loginUser(email);

    if(!userFromDB){
      throw new UserNotFound();
    }

    if(email !== userFromDB.getEmail()){
      throw new EmailNotFound();
    }

    const hashManager = new HashManager();
    const hashCompare = await hashManager.compare(password, userFromDB.getPassword());

    const authenticator = new Authenticator();
    const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });
      
    if (!hashCompare) {
      throw new Error("Invalid Password!");
    }

    return accessToken;
  }
}