// import { connect } from '../../utils/connect';
// import { NextApiRequest, NextApiResponse } from 'next';
// import Doc from '../../models/doc';

// export default async function createDoc(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { title, body } = req.body;

//   // Basic validation
//   if (!title || !body) {
//     return res.status(400).json({ message: 'Title and body are required' });
//   }

//   try {
//     await connect();

//     const newDoc = new Doc({ title, body });
//     const savedDoc = await newDoc.save();

//     return res.status(201).json(savedDoc);
//   } catch (error) {
//     console.error('Error creating document:', error); // Log the error for debugging purposes
//     const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
//     return res.status(500).json({ message: 'Failed to create document', error: errorMessage });
//   }
// }


import clientPromise from '../../utils/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function createDoc(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ message: 'Title and body are required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("notiom");
    const { insertedId } = await db.collection('docs').insertOne({ title, body });

    if (insertedId) {
      const newDoc = {
        _id: insertedId,
        title,
        body,
      };
      return res.status(201).json(newDoc);
    } else {
      return res.status(500).json({ message: 'Failed to create document' });
    }
  } catch (error) {
    console.error('Error creating document:', error);
    // Improved error typing and handling
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Failed to create document', error: error.message });
    }
    return res.status(500).json({ message: 'Failed to create document', error: 'An unknown error occurred' });
  }
}


