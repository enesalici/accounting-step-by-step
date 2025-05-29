import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITransactionCategory extends Document {
  title: string;
  typeId: Types.ObjectId;
}

const TransactionCategorySchema = new Schema<ITransactionCategory>(
  {
    title: {
      type: String,
      required: true,
    },
    typeId: {
      type: Schema.Types.ObjectId,
      ref: "TransactionType",
      required: true,
    },
  },
  
);

const TransactionCategory =
  mongoose.models.TransactionCategory ||
  mongoose.model<ITransactionCategory>(
    "TransactionCategory",
    TransactionCategorySchema
  );

export default TransactionCategory;
