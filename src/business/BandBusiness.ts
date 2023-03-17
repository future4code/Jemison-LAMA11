import { BandInputDTO } from './../model/Band';
import { CustomError } from './../error/BaseError';

export class BandBusiness {

  async createBand({ name, gender}  : BandInputDTO) {
    
    try {
      if (!name || !gender ) {
        throw new CustomError(
          400,
          'Preencha os campos "name","nickname", "email", "password"e "role"'
        );
      }

      const bandDatabase = new BandDatabase();
      await bandDatabase.createUser(id, user.getEmail(), user.getName(), hashPassword, user.getRole());
      const token = authenticator.generateToken({ id, role: user.getRole() });

      return token
      
    } catch (error: any) {
        throw new CustomError(400, error.message);
    }
  }
}