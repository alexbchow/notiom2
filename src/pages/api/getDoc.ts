import { connect } from '../../utils/connect'; 
import { NextApiRequest, NextApiResponse } from 'next';
import Doc from '../../models/doc'; 

export default async function getDoc(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connect();
      const doc = await Doc.findById(req.query.id); // Assuming id is provided in the query string

      if (!doc) {
        return res.status(404).json({ message: 'Document not found' });
      }

      res.status(200).json(doc);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get document', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
