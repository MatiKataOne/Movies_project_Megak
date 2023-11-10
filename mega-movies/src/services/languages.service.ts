import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language } from '../data/schemas/Language';


@Injectable()
export class LanguagesService {
    constructor(@InjectModel(Language.name) private languageModel: Model<Language>) { }

    async findAll(): Promise<Language[]> {
        return this.languageModel.find().exec();
    }
}
