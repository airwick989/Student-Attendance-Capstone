const classroomScan = async (req, res) => {
    try {
      const classroom  = req.params.id;
  
      const seatController = await import("../database/seatController.mjs");
      const response = await seatController.getAllSeats(classroom);
  
      res.status(200).json({ response });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };


  module.exports = { classroomScan };