import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const getAllClassrooms = functions.https.onRequest(async (request, response) => {
    try {
        const query = admin.database().ref('Rooms');
        const result = await query.once('value');

        // Convert the result to a JSON object using val()
        const data = result.val();

        response.json({ data });
    } catch (error) {
        console.error('Error:', error);
        response.status(500).send('Internal Server Error');
    }
});
