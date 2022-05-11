import mongoose from "mongoose";

const productosSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    timestamp: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    thumbnail: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
});

const carritosSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    productos: {
        id: {type: Number, required: true},
        quantity: {type: Number, required: true}
    }    
});


(async () => {
        const CS = 'mongodb://localhost:27017/ecommerce'
        try {
            await mongoose.connect(CS);
            console.log('MongoDB connected');
        } catch (err) {
            console.log(err.message);
        }
})();

export default productosSchema