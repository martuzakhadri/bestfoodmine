import { Food } from "./app/shared/models/food";
import { Tag } from "./app/shared/models/tag";

export const sample_food:Food[] = [
  {
    id: '1',
    name: 'Pizza',
    price: 10,
    coockTime:'40-50',
    favoret:false,
    imageUrl: 'assets/1.jpg',
    stars: 5,
    origins: ['Italian'],
    tags: ['Pizza', 'Italian', 'Fast Food']
     },
     {
      id: '2',
      name: 'burgur',
      price: 10,
      coockTime:'40-50',
      favoret:false,
      imageUrl: 'assets/2.jpg',
      stars: 5,
      origins: ['Italian'],
      tags: ['lunch','Italian', 'Fast Food']
       },
       {
        id: '3',
        name: 'Pizza',
        price: 10,
        coockTime:'40-50',
        favoret:false,
        imageUrl: 'assets/3.jpg',
        stars: 5,
        origins: ['Italian'],
        tags: [ 'Italian', 'Fast Food']
         },

         {
          id: '4',
          name: 'Pizza',
          price: 10,
          coockTime:'40-50',
          favoret:false,
          imageUrl: 'assets/4.jpg',
          stars: 5,
          origins: ['Italian'],
          tags: ['Italian', 'Fast Food']
           },
]

export  const sample_tags:Tag[]=[
  {name:'All',count:6},
  {name:'fastfood',count:3},
  {name:'lunch',count:1},
  {name:'slowfood',count:2},
  {name:'fry',count:3},
]
