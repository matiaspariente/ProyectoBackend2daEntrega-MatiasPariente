export default class ContenedorMem{
    constructor(type){
        this.type = type;
        this.products=[{"id":"1","timestamp":"8/4/2022 19:27:27","title":"Escuadra","description":"Util Escolar","code":"ESC","thumbnail":"www.utiles.com/escuadra.png","price":"200","stock":"5"},{"id":"2","timestamp":"8/4/2022 19:28:02","title":"Calculadora","description":"Herramienta","code":"CALC","thumbnail":"www.utiles.com/calculadora.png","price":"1499","stock":"4"},{"id":"3","timestamp":"7/5/2022 13:26:46","title":"Carpeta","description":"Util Escolar","code":"CARP","thumbnail":"www.utiles.com/carpetapng","price":"200","stock":"10"}];
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