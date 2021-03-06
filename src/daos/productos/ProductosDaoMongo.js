import { DateTime } from "luxon";
import ContenedorMongo from "../../contenedores/contenedorMongo.js";
import productosSchema from "../../config.js"

export default class ProductosDaoMongo extends ContenedorMongo { 
    constructor() {
        super(productosSchema,'productos') // se carga la informacion de productos desde filesystem
    }
    async guardar (title,description,code,thumbnail,price,stock){
            let id = 0;
            let productos = await this.leerMongo() 
            if(productos.length) id=productos[productos.length-1].id; // Se asigna id 1 si no hay productos
            let dt = DateTime.now() //se toma el dia
            let timestamp=dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
            const productoActual = { //se toma los valores ingresados
                id:++id, // se genera nuevo ID
                timestamp:timestamp,
                title : title,
                description:description,
                code:code,
                thumbnail : thumbnail,
                price:price,
                stock:stock
            }   
            await this.agregarMongo(productoActual)
            return id //se retorna id
    }

    async leer() {
        let productos = await this.leerMongo() 
        return productos //se retorna Json de productos
    }

    async leerId(pid) {
        let productos = await this.leerMongo() 
        let content = productos.find(content=>content.id == pid) // se llama  a leer pero solo se toma el elememento de ese ID
        return content
    }

    async borrar(id) {
        await this.borrarMongo(id) 
    }

    async modificar(title,description,code,thumbnail,price,stock,id){
        let dt = DateTime.now() //se toma el dia
        let timestamp=dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
        const productoActual = { //se guarda el producto con los nuevos valores
            id:id,
            timestamp:timestamp,
            title : title,
            description:description,
            code:code,
            thumbnail : thumbnail,
            price:price,
            stock:stock
        }   
        await this.modificarMongo(productoActual,id);
    }
}