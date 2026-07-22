import { Document, Types } from "mongoose";
import { pollFormSchema } from "./schemas";
import { z } from "zod";

export type ObjectIdLike = Types.ObjectId | string;
export type Populated<T> = T | Types.ObjectId | string;

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPollCreate {
  question: string;
  options: string[];
  createdBy: Populated<IUser>;
  createdAt: Date;
  expiresAt?: Date;
}

export interface IPoll extends IPollCreate, Document {
  _id: Types.ObjectId;
  votes: IVote[];
  createdBy: Populated<IUser>;
}

export interface IVoteCreate {
  pollId: Populated<IPoll>;
  optionIndex: number;
  userId?: Populated<IUser>;
  createdAt?: Date;
}

export interface IVote extends IVoteCreate, Document {
  _id: Types.ObjectId;
  pollId: Populated<IPoll>;
  userId?: Populated<IUser>;
}

// export interface ApiPromise {
//  deleteAction: (id: string) => Promise<{ success: boolean; error?: string }>; 
// }

export type ApiPromise = Promise<{ success: boolean; error?: string }>;

export type CreatePollResponse = Promise<{ success: boolean; error?: string, id?: string }>;

// =============== Components TS ================
export interface DeleteButtonProps {
  id: string;
  deleteAction: (id: string) => CreatePollResponse;
}

export type PollFormValues = z.infer<typeof pollFormSchema>

export interface UpdatePollPageProps {
  params: { id: string }
}

export interface PollFormProps {
  // The unified action prop that accepts your validated form values
  action: (data: PollFormValues) => CreatePollResponse;
  initialData?: Partial<PollFormValues>;
}

export interface PollVotePageProps {
  params: Promise<{ id: string }>;
}

export interface PollVoteState {
  isVoted: boolean;
  optionIndex: number | null;
}

export interface CheckVoteResponse {
  success: boolean;
  pollVote?: PollVoteState;
  error?: string;
}

export interface PollDetails {
  _id: string;
  question: string;
  isCreator: boolean;
  options: string[];
  createdBy: string;
  pollVote?: PollVoteState;
  createdAt: Date;
  expiresAt?: Date;
}