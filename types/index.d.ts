import mongoose from 'mongoose';

type UserInfo = {
  _id: string;
  id: string;
  objectId: string;
  username: string | null;
  name: string;
  bio: string;
  image: string;
  threads?: [{ type: mongoose.Schema.Types.ObjectId; ref: 'Thread' }];
  onboarded?: boolean;
  communities?: [{ type: mongoose.Schema.Types.ObjectId; ref: 'Community' }];
  threads?:
    | [
        {
          type: Schema.Types.ObjectId;
          ref: 'Thread';
        }
      ]
    | undefined;
};

type UserCleark = {
  id: string;
  key: string;
};
