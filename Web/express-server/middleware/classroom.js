const DBfunc = require("../database/DBfunctions.mjs");

const studentSignIn = async (req, res) =>{

    try{

        const {studentID, preferredName, pronouns, seatNumber } = req.body;

        setSeat("UA1350", seatNumber, studentID, preferredName, pronouns);
        

        res.status(200).json(req.body);
    }catch (e){
        res.status(400).json({error: e.message})
    }

}

module.exports = {studentSignIn};
