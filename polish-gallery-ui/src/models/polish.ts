import { Tag } from './tag';

export class PolishModel {
    type: string;
    brand: string;
    name: string;
    line: string;
    sku: string;
    id: string;
    colorTags: Tag[];
    moodTags: Tag[];
    pigmentTags: Tag[];
    finishes: Tag[];
    imageUrls: string[];
    headlineImageUrl: string;
    manufacturerPageUrl: string;
}
