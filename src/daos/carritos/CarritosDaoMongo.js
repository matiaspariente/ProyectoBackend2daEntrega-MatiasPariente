import ContenedorMongo from "../../contenedores/contenedorMongo.js";
import carritosSchema from "../../config.js"

export default class CarritosDaoMongo extends ContenedorMongo { 
    constructor() {
        super(carritosSchema,'carritos'); // se carga la informacion de carritos desde filesystem
    }

    async crear(){
        let id = 0;
        let carts = await this.leerMongo()
        if(carts.length) id=carts[carts.length-1].id; // Se asigna id 1 si no hay productos
        const cartActual = { //se toma los valores ingresados
            id:++id,
            products: [],
        }
        await this.agregarMongo(cartActual)
        return id //se retorna id
    }

    async guardar(cid,pid,quantity){
            let carts = await this.leerArchivo()
            let content=carts.find(carts=>carts.id == cid) // se agrega producto con pid al carrito cid
            if(content==undefined)  return {status:'error', message: 'carrito inexistente'} // si da error es por que no hay carrito
            let indexCart = carts.findIndex(carts=>carts.id == cid)
            content= carts[indexCart].products
            if(content.length!=0){
                let indexProduct = content.findIndex(content=>content.products.id == pid)
                if(indexProduct!=-1){
                    carts[indexCart].products[indexProduct].products.quantity+=quantity // si ya existia el producto en el carrito se suma cantidad
                    await this.modificarMongo(carts[indexCart],cid);
                    return {status:'success', message: `se agrego producto con ID:${pid} en carrito con ID:${cid}`}
                }
            } 
            content={
                id:cid,
                products:{
                    id : pid,
                    quantity: quantity, 
                    }
            }
            await this.modificarMongo(carts[indexCart],cid)// se guarda en carrito el producto correspondiente
            return {status:'success', message:`se agrego producto con ID:${pid} en carrito con ID:${cid}`}  
    }

    async leer(id) {
        let carts = await this.leerArchivo()
        return carts.find(carts=>carts.id == id) // se retorna Json del carrito pedido
    }

    async leerTodo (){
        let carts = await this.leerArchivo()
        return carts //se retorna Json del carrito
    }

    async borrar(id){
        await this.borrarMongo(cid)
    }

    async borrarProducto(cid,pid){
        let carts = await this.leerArchivo()
        let indexCart = carts.findIndex(carts=>carts.id == cid) // se busca por cid
        let content = carts[indexCart].products.findIndex(products=>products.products.id == pid) // luego por pid y se borra si existe
        carts[indexCart].products= carts[indexCart].products.filter(products=>products.products.id != pid)
        await this.modificarMongo(carts[indexCart],cid);
        return content
    }
}