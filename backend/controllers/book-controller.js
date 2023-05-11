import bookModel from "../mongodb/models/book.js";

const getAllBookings=async(req,res)=>{
    try {
        const allBookings=await bookModel.find();
        res.status(200).json(allBookings);       
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

const createBooking=async(req,res)=>{
    // console.log(req.body)
    try {
        const book=new bookModel({
            userId:req.body.id,
            id:req.body.booknId,
            type:req.body.type,
            fromDate:req.body.from,
            toDate:req.body.to,
            shift:req.body.shift,
            food:req.body.food,
            floor:req.body.floor,
            seat:req.body.seat,
            status:req.body.status
        })
        const bookData=await book.save();
        res.status(200).send({success:true,message:'Employee Created',data:bookData});
    } catch (error) {
        res.status(400).send({success:false,message:error.message});
    }
}

const updateBooking=async (req,res)=>{
    // console.log(req.body)
    try {
        const book=await bookModel.findOneAndUpdate({id:req.body.id},{
            $set:{
                status:req.body.status
            }
        },
        { new: true });
        res.status(200).send({success:true,message:'Booking Updated',data:book});
    } catch (error) {
        res.status(400).send({success:false,message:error.message});
    }
}

const getBooking=async(req,res)=>{
    // console.log(req.params.id)
    try {
        let id=req.params.id;
        const bookData=await bookModel.findOne({id:id})
        console.log(bookData)
        res.status(200).send({success:true,message:'Booking Updated',data:bookData});
        
    } catch (error) {
        res.status(400).send({success:false,message:error.message}); 
    }

}

const updateCheckInTime=async (req,res)=>{
    console.log(req.body)
    try {
        const updateTime=await bookModel.findOneAndUpdate({id:req.body.id},{
            $set:{
                checkInTime:req.body.time
            }
        },
        { new: true });
        res.status(200).send({success:true,message:'Booking Updated',data:updateTime});
    } catch (error) {
        res.status(400).send({success:false,message:error.message});
    }
}

const getUserBooking=async(req,res)=>{
    console.log(req.params.id);
    try {
        let id=req.params.id;
        const userData=await bookModel.find({userId:id})
        res.status(200).send({success:true,message:'Booking Updated',data:userData}); 
        
    } catch (error) {
        res.status(400).send({success:false,message:error.message});
    }
}

const getBookingsByDate=async(req,res)=>{
   let a = req.body
    try {
        const userData=await bookModel.find({$and:[{fromDate: a.fromDate},{toDate:a.toDate}]})
        // console.log(userData);
        // let id=userData._id;
        // console.log(id);
        // const data=await bookModel.findById({_id:_id})
        // console.log(data);
        res.status(200).send({success:true,message:'Date Updated',data:userData}); 
        
        
    } catch (error) {
        res.status(400).send({success:false,message:error.message});
    }
}
export {
    getAllBookings,createBooking,updateBooking,getBooking,updateCheckInTime,getUserBooking,
    getBookingsByDate
}