// import mongoose, { Schema } from 'mongoose';

// interface IDoc {
//   user_id: mongoose.Schema.Types.ObjectId; // References User's id
//   title: string;
//   body: string;
//   created_at: Date;
// }

// const DocSchema: Schema = new Schema<IDoc>({
//   user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   body: { type: String, required: true },
//   created_at: { type: Date, required: true },
// }, { timestamps: { createdAt: 'created_at' } }); // Auto manage `created_at`

// // Check if the model already exists before compiling it
// const Doc = mongoose.models.Doc || mongoose.model<IDoc>('Doc', DocSchema);

// export default Doc;

import mongoose, { Schema } from 'mongoose';

interface IDoc {
  title: string;
  body: string;
}

const DocSchema: Schema = new Schema<IDoc>({
  title: { type: String, required: true },
  body: { type: String, required: true },
}, { timestamps: true }); // Enable automatic timestamp management

const Doc = mongoose.models.Doc || mongoose.model<IDoc>('Doc', DocSchema);

export default Doc;
