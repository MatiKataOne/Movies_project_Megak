import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Language } from './Language';
import { Country } from './Country';
import { Actor } from './Actor';
import { Genre } from './Genre';

@Schema()
export class Movie extends Document {
  @Prop()
  title: string;

  @Prop()
  poster: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop()
  homepage: string;

  @Prop()
  runtime: number;

  @Prop()
  budget: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Actor', index: true }] })
  actors: Actor[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Genre', index: true }] })
  genres: Genre[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Country', index: true }] })
  countries: Country[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Language', index: true }] })
  languages: Language[];
}
