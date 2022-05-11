import express from "express";
import io from "../app.js";
import CarritosDaoArchivo from "../daos/carritos/CarritosDaoArchivo.js";
import CarritosDaoMem from "../daos/carritos/CarritosDaoMem.js";
import CarritosDaoMongo from "../daos/carritos/CarritosDaoMongo.js";

const router = express.Router();

const managerCarts = new CarritosDaoArchivo(); // se llama a instancia de Carts

router.get('/:cid/products',async (req,res)=>{  
    let {cid} = req.params // se toma Cid
    let content = await managerCarts.leer(cid)  // se consulta carrito con cid tomado 
    if(content!=undefined) {
        if(content.products.length!=0) res.status(200).send(content.products); //se informa carrito
        else res.status(404).send({status:'error',message: 'no hay productos guardados en el carrito'})
    } 
    else res.status(404).send({status:'error',message: 'carrito inexistente'})
})

router.post('/', async (req,res)=>{
    let id = await managerCarts.crear() //se genera carrito con metodo crear
    res.status(200).send({status:'success',message:`carrito creado con ID: ${id}`}) // se informa
})

router.post('/:cid/products',async (req,res)=>{
    let {cid} = req.params;
    let content = await managerCarts.guardar(cid,req.body.id,req.body.quantity) //se suma elemento al carrito correspondiente con metodo guardar
    res.status(200).send(content) // se informa
    io.emit('logCart', await managerCarts.leerTodo()) 
    })

router.delete('/:cid',async (req,res)=>{
let {cid} = req.params;
let content = await managerCarts.leer(cid) // se lee el carrito
if(content!=undefined) { // si existe se borra
    await managerCarts.borrar(cid) // una vez leido se llama a la funcion borrar
    res.status(200).send({status:'success',message:`Carrito con ID:${cid} borrado`})  //se informa
    io.emit('logCart',await managerCarts.leerTodo())
} 
else res.status(404).send({status:'error',message: 'carrito inexistente'})
})

router.delete('/:cid/products/:pid',async (req,res)=>{
    let {cid,pid} = req.params;
    let content = await managerCarts.leer(cid) // se lee el carrito
    if(content!=undefined) {
        content=await managerCarts.borrarProducto(cid,pid) // una vez leido se llama a la funcion borrar
        if(content==-1) res.status(404).send({status:'error',message:`Producto con ID:${pid} inexistente en carrito con ID${cid}`})
        else res.status(200).send({status:'success',message:`Producto con ID:${pid} borrado de carrito con ID:${cid}`})  //lo informo
        io.emit('logCart',await managerCarts.leerTodo())
    } 
    else res.status(404).send({status:'error',message: 'carrito inexistente'})
    })

export default router;