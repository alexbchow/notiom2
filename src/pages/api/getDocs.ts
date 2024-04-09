// import { connect } from '../../utils/connect'; 
// import { NextApiRequest, NextApiResponse } from 'next';
// import Doc from '../../models/doc'; 

// export default async function getDoc(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       await connect();
//       const { id } = req.query; // Assume document ID is passed as query parameter
//       const doc = await Doc.findById(id);

//       if (!doc) {
//         return res.status(404).json({ message: 'Document not found' });
//       }

//       res.status(200).json(doc);
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to get document', error: 'An unknown error occurred' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }


import clientPromise from '../../utils/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getDocs(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("notiom");
    const docs = await db.collection('docs').find({}).toArray(); // Retrieve all documents

    return res.status(200).json(docs); // Return an array of documents
  } catch (error) {
    console.error('Failed to get documents:', error);
    return res.status(500).json({ message: 'Failed to get documents', error: 'An unknown error occurred' });
  }
}

