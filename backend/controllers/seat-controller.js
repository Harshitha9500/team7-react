import seatModel from "../mongodb/models/seat.js";

const getAllSeats=async(req,res)=>{
    try {
        const allSeats=await seatModel.find();
        res.status(200).json(allSeats);       
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

const createSeat=async(req,res)=>{
    console.log(req.body);
    try {
        const seat=new seatModel({
            floor:req.body.floor,
            seats:req.body.seats,
        })
        const seatData=await seat.save();

        res.status(200).send({success:true,message:'Seat Created',data:seatData});
        
    } catch (error) {
        res.status(400).send({success:false,message:error.message});
    }
}

const getSeatInfo=async(req,res)=>{
   const floor=req.params.floor;
//    console.log(floor);
    try{
        const seat=await seatModel.findOne({floor:floor})
        // console.log(seat)
        res.status(200).json(seat);
    }catch(error){
        res.status(400).send({success:false,message:error.message});
    }
}

const updateSeatBooked=async(req,res)=>{
    // console.log(req.body);
    try {
        let floor=req.body.floor;
        const updatedSeat=await seatModel.findOneAndUpdate({floor:floor},{
            $push:{
                bookedSeats:req.body.selectedSeat
            },         
        },
        { new: true });
        res.status(200).send({success:true,message:'Seat Updated',data:updatedSeat});

    } catch (error) {
        res.status(400).send({success:false,message:error.message});
    }
}

const removeBooked=async(req,res)=>{
    console.log(req.body);
    try {
        const update= await seatModel.findOneAndUpdate({floor:req.body.floor},{
            $pull:{
                bookedSeats:req.body.seat
            }
        },{ new: true });
        res.status(200).send({success:true,message:'Seat Updated',data:update});
    } catch (error) {
        res.status(400).send({success:false,message:error.message});
    }
}

const deleteSeat=async(req,res)=>{
    try{
        const id=req.params.id;
        await seatModel.deleteOne({_id:id});
        res.status(200).send({success:true,message:'Seat deleted successfully'});
    }catch(error){
        res.status(400).send({success:false,message:error.message});
    }
};

const updateSeat=async(req,res)=>{
    console.log(req.body);
    try{       
        let id=req.body.id; 
        let floor=req.body.floor;
        let seats=req.body.seat;
         const updateSeat=await seatModel.findByIdAndUpdate({_id:id},{$set:{
            floor:floor,
            seats:seats
        }})
        res.status(200).send({success:true,message:'Seat Updated',data:updateSeat});

    }catch(error){
        res.status(400).send({success:false,message:error.message});
    }
}

export{
    getAllSeats,createSeat,getSeatInfo,updateSeatBooked,removeBooked,deleteSeat,updateSeat,
}