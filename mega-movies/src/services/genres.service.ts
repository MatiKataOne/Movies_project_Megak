import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from '../data/schemas/Genre';


@Injectable()
export class GenresService {
    constructor(@InjectModel(Genre.name) private genreModel: Model<Genre>) { }

    async findAll(): Promise<Genre[]> {
        return this.genreModel.find().exec();
    }
}
