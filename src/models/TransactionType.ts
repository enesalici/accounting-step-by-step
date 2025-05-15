import mongoose, { Schema, Document } from "mongoose";

export interface ITransactionType extends Document {
  title: string; 
}

const TransactionTypeSchema = new Schema<ITransactionType>({
  title: { type: String, required: true }, 
});

const TransactionType =
  mongoose.models.TransactionType ||
  mongoose.model<ITransactionType>("TransactionType", TransactionTypeSchema);

export default TransactionType;
