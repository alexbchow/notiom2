// export interface User {
//     id: number; // assuming the id is automatically generated by MongoDB, you might omit this field when inserting new users
//     first_name: string;
//     last_name: string;
//     email: string;
//   }
  
import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
}

const UserSchema: Schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
