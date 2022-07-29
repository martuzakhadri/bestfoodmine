import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_food, sample_tags } from 'src/data';
import { FOOD_ID_URL, FOODS_SEARCH_URL, FOODS_TAGS_URL, FOODS_TAG_URL, FOODS_URL } from '../shared/constants/url';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor( private http: HttpClient) { }

  getAll():Observable <Food[]> {
    return this.http.get<Food[]>(FOODS_URL);

  }

  getFoodBysearchterm(searchTerm: string){
    return this.http.get<Food[]>(FOODS_SEARCH_URL + searchTerm);
  }

  getAlltags():Observable <Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL)
  }

 getfoodBytags(tags:string):Observable <Food[]>{
  return tags == "All" ?
  this.getAll():
  this.http.get<Food[]>(FOODS_TAG_URL +tags);
 }

 getfoodId(foodId:string): Observable <Food>{
   return this.http.get<Food>(FOOD_ID_URL +foodId);
 }

}
