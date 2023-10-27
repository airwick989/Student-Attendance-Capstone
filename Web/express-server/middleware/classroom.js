const studentSignIn = async (req, res) =>{

    try{

        const {studentID, preferredName, pronouns, seatNumber } = req.body;
        

        res.status(200).json(req.body);
    }catch (e){
        res.status(400).json({error: e.message})
    }

}

module.exports = {studentSignIn};
