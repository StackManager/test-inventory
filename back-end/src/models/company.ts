import mongoose, { Document, Types, Model }  from 'mongoose';
import { ItemCompany } from './items';

export interface CompanyAttrs {
  name: string;
  address: string;
  nit: number;
  phone: string;
  startDate: Date;
}

interface CompanyDoc extends Document {
  name: string;
  address: string;
  nit: number;
  phone: string;
  startDate: Date;
}

interface CompanyModel extends Model<CompanyDoc> {
  build(attrs: CompanyAttrs): CompanyDoc;
}
const companySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    nit: {
      type: Number,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      default: Date.now
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

companySchema.statics.build = (attrs: CompanyAttrs) => {
  return new Company(attrs);
};

/*companySchema.pre('remove', async function(next) {
  ItemCompany.remove({ company: this._id }).exec();
  next();
});*/


const Company = mongoose.model<CompanyDoc, CompanyModel>('Company', companySchema);

export { Company };