import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Actor extends Document {
    @Prop({ type: String, index: true })
    name: string;

    @Prop()
    photo: string;
}
