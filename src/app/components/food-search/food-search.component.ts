import {AfterViewInit, Component, ElementRef, ViewChild, ViewChildren} from "@angular/core";
import {CalculationService} from "../../services/calculation.service";
import {FoodList, ShortFoodDescription} from "../../models/models";
import {FoodDatabaseService} from "../../services/food-database.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/debounceTime";

@Component({
  selector: "food-search",
  templateUrl: "./food-search.component.html",
  styleUrls: ["./food-search.component.scss"]
})
export class FoodSearchComponent implements AfterViewInit {
  public foods: ShortFoodDescription[];
  @ViewChild("searchInput") public searchInput: ElementRef;

  constructor(private calculationService: CalculationService,
              private foodDaatabaseService: FoodDatabaseService) {
  }

  public selectFood(food: ShortFoodDescription): void {

  }

  public ngAfterViewInit(): void {
    Observable.fromEvent(this.searchInput.nativeElement, "keyup")
      .debounceTime(1000).subscribe(() => {
      this.searchFoods(this.searchInput.nativeElement.value);
    });
  }

  private searchFoods(foodName: string): void {
    this.foodDaatabaseService.searchFood(foodName).subscribe((foodList: FoodList) => {
      this.foods = foodList.list;
    });
  }
}
