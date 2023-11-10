import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../data/schemas/Country';


@Injectable()
export class CountriesService {
    constructor(@InjectModel(Country.name) private countryModel: Model<Country>) { }

    async findAll(): Promise<Country[]> {
        return this.countryModel.find().exec();
    }
}
