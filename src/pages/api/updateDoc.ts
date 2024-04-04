import { connect } from '../../utils/connect'; // Update the path as necessary
import { NextApiRequest, NextApiResponse } from 'next';
import Doc from '../../models/doc'; // Update the path as necessary

export default async function updateDoc(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { id, title, body } = req.body;
      await connect();

      const updatedDoc = await Doc.findByIdAndUpdate(id, { title, body }, { new: true });

      if (!updatedDoc) {
        return res.status(404).json({ message: 'Document not found' });
      }

      res.status(200).json(updatedDoc);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update document', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
