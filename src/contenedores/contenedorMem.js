export default class ContenedorMem{
    constructor(type){
        this.type = type;
        this.products=[];
        this.carts=[];
    }

    leerMem(){
        if(this.type==='products'){
            return this.products;
        }
        else if(this.type==='carts'){
            return this.carts;
        }
    }

    guardarMem(content){
        if(this.type==='products'){
            this.products=content;
        }
        else if(this.type==='carts'){
            this.carts=content;
        }
    }
}