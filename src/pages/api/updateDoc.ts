// import { connect } from '../../utils/connect';
// import { NextApiRequest, NextApiResponse } from 'next';
// import Doc from '../../models/doc';

// export default async function updateDoc(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       await connect();
//       const { id, title, body } = req.body;
//       const updatedDoc = await Doc.findByIdAndUpdate(id, { title, body }, { new: true });

//       if (!updatedDoc) {
//         return res.status(404).json({ message: 'Document not found' });
//       }

//       res.status(200).json(updatedDoc);
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to update document', error: 'An unknown error occurred' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }

import { ObjectId } from 'mongodb';
import clientPromise from '../../utils/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function updateDoc(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id, title, body } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("notiom");
    const updateResult = await db.collection('docs').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, body } },
      { upsert: true }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const updatedDoc = { _id: id, title, body }; // Be cautious with returning the raw ObjectId as part of a JSON response
    return res.status(200).json(updatedDoc);
  } catch (error) {
    console.error('Failed to update document:', error);
    return res.status(500).json({ message: 'Failed to update document', error: 'An unknown error occurred' });
  }
}
