import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Genre extends Document {
  @Prop({ type: String, index: true, isRequired: true })
  name: string;
}
