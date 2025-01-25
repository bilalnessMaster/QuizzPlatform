import { data } from "../lib/Configure.js";


export const getQcms = async (req, res) => {
        try {
            const filter = req.body
            console.log(filter);
            
            res.status(200).json({
                success : true , 
                message: "fetching data for qcms",
                qcms : data
            })
            
        } catch (error) {
            console.log('error happened while fetching qcms',error);
            return res.status(500).json({
                success : true , 
                message : "internal error", 
            })
            
        }
}