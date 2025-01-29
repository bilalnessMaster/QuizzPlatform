
import Attempt from "../models/Attempt.model.js";
import Qcm from "../models/Qcm.model.js";

export const getQcms = async (req, res) => {
        try {
            const filter = req.body
            const qcms = await Qcm.aggregate([
                {
                    $match : {
                        category : {$in  : filter.category} , 
                        level : filter.level ,
                        language : filter.language 
                    }
                },{$sample : {size : filter.numberQcms }}
            ]).limit(filter.numberQcms)
            
            res.status(200).json({
                success : true , 
                message: "fetching data for qcms",
                qcms : qcms
            })
            
        } catch (error) {
            console.log('error happened while fetching qcms',error);
            return res.status(500).json({
                success : true , 
                message : "internal error", 
            })
            
        }
}

export const quizAttempt = async (req ,res) => { 
    try {
        const payload = req.body
        const newAttempt= new Attempt({
            ...payload
        })
        await newAttempt.save()
        res.status(200).json({
            success : true , 
            message : "attempt has been registed", 
        })
    } catch (error) {
        console.log('error while saving attempt',error);
        return res.status(500).json({
            success : false , 
            message : "internal error", 
        })
    }
}