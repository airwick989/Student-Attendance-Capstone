/* eslint-disable require-jsdoc */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as PDFDocument from "pdfkit";
import * as QRCode from "qrcode";

export const QRGenerator = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Respond to CORS preflight requests
    res.status(204).send("");
    return;
  }

  const roomName = req.body.roomName;
  try {
    const roomSize = await getRoomSize(roomName);
    const qrPDFBuffer = await generateQRCodePDF(roomSize);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=QR_Codes_${roomName}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");

    res.end(qrPDFBuffer);

    console.log("PDF file sent successfully.");
  } catch (error) {
    res.status(400).json({error: (error as Error).message});
  }
});

async function getRoomSize(roomName: string): Promise<number> {
  if (!roomName) {
    throw Error("Room name is required");
  }
  const roomQuery = admin.database().ref(`Rooms/${roomName}/map`);
  const roomSnapshot = await roomQuery.once("value");

  if (!roomSnapshot.exists()) {
    throw new Error("Room not found.");
  }

  return roomSnapshot.val().length - 1;
}

async function generateQRCodePDF(roomSize: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });

    const qrCodeWidth = 100;
    const qrCodeHeight = 100;
    const qrCodeMargin = 20;
    let yPosition = doc.page.margins.top;
    // Generate PDF dynamically
    (async function() {
      for (let i = 1; i <= roomSize; i++) {
        const qrData = `${i}`;
        const qrCodeBuffer = await QRCode.toBuffer(qrData);
        // Check if the QR code will fit on the current page
        if (
          yPosition + qrCodeHeight + qrCodeMargin >
          doc.page.height - doc.page.margins.bottom
        ) {
          doc.addPage();
          yPosition = doc.page.margins.top;
        }

        // Add QR code image to PDF
        if (
          yPosition + qrCodeHeight + qrCodeMargin <=
          doc.page.height - doc.page.margins.bottom
        ) {
          doc.image(qrCodeBuffer, doc.page.margins.left, yPosition, {
            width: qrCodeWidth,
            height: qrCodeHeight,
          });
          doc.text(
            `QR Code for seat number ${i}`,
            100 + 100 + 20,
            yPosition + 15
          );

          // Update y position for the next QR code
          yPosition += qrCodeHeight + qrCodeMargin;
        } else {
          console.log(`Skipping QR code ${i} as it won't fit on the page.`);
        }
      }

      doc.end();
    })().catch(reject);
  });
}
