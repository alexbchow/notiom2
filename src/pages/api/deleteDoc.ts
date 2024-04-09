// import { connect } from '../../utils/connect';
// import { NextApiRequest, NextApiResponse } from 'next';
// import Doc from '../../models/doc'; 

// export default async function deleteDoc(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'DELETE') {
//     try {
//       await connect();
//       const { id } = req.query; // Assume document ID is passed as query parameter
//       const deletedDoc = await Doc.findByIdAndDelete(id);

//       if (!deletedDoc) {
//         return res.status(404).json({ message: 'Document not found' });
//       }

//       res.status(200).json({ message: 'Document successfully deleted' });
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to delete document', error: 'An unknown error occurred' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }


import { ObjectId } from 'mongodb';
import clientPromise from '../../utils/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function deleteDoc(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const id = req.query.id as string;

  try {
    const client = await clientPromise;
    const db = client.db("notiom");
    const deleteResult = await db.collection('docs').deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount === 1) {
      return res.status(200).json({ message: 'Document successfully deleted' });
    } else {
      return res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    console.error('Failed to delete document:', error);
    return res.status(500).json({ message: 'Failed to delete document', error: 'An unknown error occurred' });
  }
}
