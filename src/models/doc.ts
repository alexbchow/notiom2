export interface Doc {
    id: number; // as with User, this might be omitted on insertion
    user_id: number; // this references the User's id
    title: string;
    body: string;
    created_at: Date;
  }
  