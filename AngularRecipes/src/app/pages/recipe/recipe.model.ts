import { Timestamp } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient/ingredient.model';
import { StarComponent } from 'src/app/shared/star/star.component';
import { last } from 'rxjs/operators';

export class Recipe {
    
    name: string;
    description: string;
    imageUrl: string;
    timeStamp: Date;
    ingredients: Ingredient[];
    rating: number;

    constructor( name: string, description: string, image: string, ingreds: Ingredient[], rating: number) {
        
        /* this.id = last (this.id, 1), */
        this.name = name;
        this.description = description; // proceso
        this.imageUrl = image;
        this.ingredients = ingreds;
        this.rating = rating;
        
    }

    toString() {
        return 'Name:' +  this.name + ', Description: ' +
            this.description ;
    }
}


/* MODEL
interface Item {
  name: string;
  price: number;
}

interface Menu {
  lunch: Array<Item>;
  dinner: Array<Item>;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface Images {
  thumbnail: string;
  owner: string;
  banner: string;
}

export interface Restaurant {
  name: string;
  slug: string;
  images: Images;
  menu: Menu;
  address: Address;
  _id: string;
}
 */