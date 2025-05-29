import mongoose, { Schema, Document, Types } from "mongoose";

export interface IInvoiceCategory extends Document {
  title: string;
  typeId: Types.ObjectId;
}

const InvoiceCategorySchema = new Schema<IInvoiceCategory>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    typeId: {
      type: Schema.Types.ObjectId,
      ref: "TransactionCategory",
      required: true,
    },
  }
);

const InvoiceCategory =
  mongoose.models.InvoiceCategory ||
  mongoose.model<IInvoiceCategory>("InvoiceCategory", InvoiceCategorySchema);

export default InvoiceCategory;
