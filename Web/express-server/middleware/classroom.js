const studentSignIn = async (req, res) =>{

    try{
        res.status(200).json({message: "success"});
    }catch{
        res.status(400).json({error: "error"})
    }


}



module.exports = {studentSignIn};








