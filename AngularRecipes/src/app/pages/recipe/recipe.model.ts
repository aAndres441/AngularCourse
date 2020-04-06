import { Timestamp } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient/ingredient.model';
import { StarComponent } from 'src/app/shared/star/star.component';

export class Recipe {
    id = 0;
    name: string;
    description: string;
    imageUrl: string;
    timeStamp: Date;
    ingredients: Ingredient[];
    rating: number;

    constructor(id: number, name: string, description: string, image: string, ingreds: Ingredient[], rating: number) {
        
        this.id = id++,
        this.name = name;
        this.description = description;
        this.imageUrl = image;
        this.ingredients = ingreds;
        this.rating = rating;
        
    }

    toString() {
        return 'Name:' +  this.name + ', Description: ' +
            this.description + ', ID ' + this.id;
    }
}
