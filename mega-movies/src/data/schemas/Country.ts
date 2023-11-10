import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Country extends Document {
    @Prop({ type: String, index: true })
    name: string;
}
