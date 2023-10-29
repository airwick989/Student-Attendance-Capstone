const studentScan = async (req, res) => {
  try {
    const { studentID, roomNumber, seatNumber } = req.body;

    const seatController = await import("../database/seatController.mjs");
    const response = await seatController.setSeat(
      roomNumber,
      seatNumber,
      studentID
    );

    res.status(200).json({ response: response });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const studentLeaveSeat = async (req, res) => {
  try {
    const { roomNumber, seatNumber } = req.body;

    const seatController = await import("../database/seatController.mjs");
    const response = await seatController.emptySeat(roomNumber, seatNumber);

    res.status(200).json({ response: response });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { studentScan, studentLeaveSeat };
