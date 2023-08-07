import mongoose, { Document, Types, Model }  from 'mongoose';

export interface ItemCompanyAttrs {
  name: string;
  description: string;
  price: Number;
  company:Types.ObjectId;
}

interface ItemCompanyDoc extends Document {
  name: string;
  description: string;
  price: Number;
  company:Types.ObjectId;
}

interface ItemCompanyModel extends Model<ItemCompanyDoc> {
  build(attrs: ItemCompanyAttrs): ItemCompanyDoc;
}

const ItemCompanySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
    },
    description: { 
      type: String, 
      required: true
    },
    price: { 
      type: Number, 
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Company',
      required: true
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ItemCompanySchema.statics.build = (attrs: ItemCompanyAttrs) => {
  return new ItemCompany(attrs);
};

const ItemCompany = mongoose.model<ItemCompanyDoc, ItemCompanyModel>('ItemCompany', ItemCompanySchema);

export { ItemCompany };