import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {FoodDetails, FoodList, ShortFoodDescription} from "../models/models";
import "rxjs/add/operator/map";

@Injectable()
export class FoodDatabaseService {
  private baseUrl = "https://api.nal.usda.gov/ndb/"
  private apiKey = "shu2u9OmC8kU5xD25f79McT44ecPkZ6pyFIu2pzH";

  constructor(private httpClient: HttpClient) {
  }

  public getFoodDetails(foodId: number): Observable<FoodDetails> {
    return this.httpClient.get(`${this.baseUrl}reports/?ndbno=${foodId}&type=f&format=json&api_key=${this.apiKey}`);
  }

  public searchFood(foodName: string, pageNumber = 0, pageSize = 20): Observable<FoodList> {
    return this.httpClient.get(`${this.baseUrl}search/?q=${foodName}&ds=Standard Reference&max=${pageSize}&offset=${pageSize * pageNumber}&format=json&api_key=${this.apiKey}`)
      .map(({list}: any) => {
        console.log(list);
        const foodList: FoodList = {
          totalItems: list.total,
          list: list.item.map(y => {
            const foodDescription: ShortFoodDescription = {
              group: y.group,
              id: y.ndbno,
              name: y.name,
            };
            return foodDescription;
          })
        };
        return foodList;
      });
  }
}
