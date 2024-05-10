import OrderModel from '../models/Order.js'

export const getAllOrdes = async (req,res) => {
    try {
        const orders = await OrderModel.find();
        res.json(orders);
    } catch (err) {
        console.log(err);
     res.status(500).json({
         message: 'Не удалось найти заказы',
     });
    }
}

export const order = async (req,res) => {
    try {
 
     const doc = new OrderModel({
         phone: req.body.phone,
         firstName: req.body.firstName,
         surname: req.body.surname,
         secondName: req.body.secondName,
         comment : req.body.comment,
         user: req.userId,
     });
 
     const getorder = await doc.save();
     res.json(getorder);
 
    } catch (err) {
     console.log(err);
     res.status(500).json({
         message: 'Не удалось оформить заказ',
     });
    }
};