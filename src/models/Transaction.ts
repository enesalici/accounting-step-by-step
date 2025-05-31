import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITransaction extends Document {
  title: string;
  amount: number;
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  description?: string;
  createdDateAt: Date;
  updatedDateAt: Date;
};

const TransactionSchema = new Schema<ITransaction>(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "TransactionCategory",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
      
    },
  },
  { timestamps: { createdAt: "createdDateAt", updatedAt: "updatedDateAt" } }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
