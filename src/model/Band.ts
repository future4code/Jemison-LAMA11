export class Band{
    constructor(
    private id: string,
    private name: string,
    private gender: string,
    private responsible: string
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }

    getGender(){
        return this.gender;
    }

    getrRsponsible(){
        return this.responsible;
    }

    setId(id: string){
        this.id = id;
    }

    setName(name: string){
        this.name = name;
    }

    setGender(gender: string){
        this.gender = gender;
    }

    setResponsible(password: string){
        this.responsible = password;
    }
}

export interface BandInputDTO{
    name: string;
    gender: string;
    responsible: string;
}