import { connect } from '../../utils/connect'; 
import { NextApiRequest, NextApiResponse } from 'next';
import Doc from '../../models/doc';

export default async function createDoc(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, body, user_id } = req.body;
      await connect();
      
      const newDoc = new Doc({
        title,
        body,
        user_id,
        created_at: new Date(),
      });

      const savedDoc = await newDoc.save();
      res.status(201).json(savedDoc);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create document', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
