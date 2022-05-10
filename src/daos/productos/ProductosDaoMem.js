import { DateTime } from "luxon";
import fs from 'fs';
import __dirname from '../../utils.js';
import ContenedorMem from "../../contenedores/contenedorMem.js";

export default class ProductosDaoMem extends ContenedorMem { 
    constructor() {
        super('products') // se carga la informacion de productos desde memoria
    }
    guardar (title,description,code,thumbnail,price,stock){
            let id = 0;
            let productos = this.leerMem() 
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
            productos.push(productoActual);// se agregan a productos
            this.guardarMem(productos)
            return id //se retorna id
    }

    leer() {
        let productos = this.leerMem() 
        return productos //se retorna Json de productos
    }

    leerId(pid) {
        let productos = this.leerMem() 
        let content = productos.find(content=>content.id == pid) // se llama  a leer pero solo se toma el elememento de ese ID
        return content
    }

    borrar(id) {
        let productos = this.leerMem() 
        productos = productos.filter((products)=>products.id != id) // se elimina el producto con el id recibido
        this.guardarMem(productos)
    }

    modificar(title,description,code,thumbnail,price,stock,id){
        let productos = this.leerMem() 
        productos = productos.filter((productos)=>productos.id != id) //se elimina el producto con el id recibido
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
        productos.push(productoActual); // se agrega a productos
        productos.sort((a,b)=>a.id-b.id) // se ordena por ID
        fs.writeFileSync(__dirname+'/fs/products/products.txt',JSON.stringify(this.productos));
        this.guardarMem(productos);
    }
}