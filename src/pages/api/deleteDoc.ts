import { connect } from '../../utils/connect'; // Update the path as necessary
import { NextApiRequest, NextApiResponse } from 'next';
import Doc from '../../models/doc'; // Update the path as necessary

export default async function deleteDoc(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      await connect();
      const deletedDoc = await Doc.findByIdAndDelete(req.query.id);

      if (!deletedDoc) {
        return res.status(404).json({ message: 'Document not found' });
      }

      res.status(200).json({ message: 'Document successfully deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete document', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
