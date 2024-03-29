export abstract class BaseError extends Error {
    constructor(message: string, public code: number) {
      super(message);
    }
  }

  export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}

export class InvalidName extends CustomError{ 
    constructor(){
        super(400, "Nome inválido")
    }
}

export class InvalidEmail extends CustomError{ 
    constructor(){
        super(400, "Email inválido")
    }
}


export class InvalidPassword extends CustomError{ 
    constructor(){
        super(400, "Senha inválida")
    }
}

export class InvalidPasswordNumber extends CustomError{ 
    constructor(){
        super(400, "Senha deve conter no minimo 6 caracteres")
    }
}

export class UserNotFound extends CustomError{ 
    constructor(){
        super(404, "Usuário não encontrado")
    }
}

export class EmailNotFound extends CustomError{ 
    constructor(){
        super(404, "Email não encontrado")
    }
}

export class Unauthorized extends CustomError{ 
    constructor(){
        super(401, "Usuário não autorizado")
    }
}

export class InvalidRole extends CustomError{ 
  constructor(){
      super(401, "Digite se é usuario ou administrador.")
  }
}
  