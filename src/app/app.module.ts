import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, PreloadAllModules } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from "environments/environment";
import { ROUTES } from "./app.routes";
// App is our top level component
import { AppComponent } from "./app.component";
import { APP_RESOLVER_PROVIDERS } from "./app.resolver";
import { AppState, InternalStateType } from "./app.service";
import { AboutComponent } from "./components/demo/about";
import { NoContentComponent } from "./components/demo/no-content";
import { XLargeDirective } from "./components/home/x-large";
import { DevModuleModule } from "./components/demo/+dev-module";

import "../styles/styles.scss";
import "../styles/headings.css";
import {FoodSearchComponent} from "./components/food-search/food-search.component";
import {FoodDatabaseService} from "./services/food-database.service";
import {CalculationService} from "./services/calculation.service";
import { HomeComponent } from "./components/home/home.component";
import { SliderComponent } from "./components/slider/slider.component";
import { FoodTileComponent } from "./components/food-tile/food-tile.component";
import { CalculatorsComponent } from "./components/calculators/calculators.component";
import { ConsumptionSummaryComponent } from "./components/consumption-summary/consumption-summary.component";

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2"s bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    FoodSearchComponent,
    AboutComponent,
    HomeComponent,
    NoContentComponent,
    CalculatorsComponent,
    FoodTileComponent,
    SliderComponent,
    ConsumptionSummaryComponent,
    XLargeDirective
  ],
  /**
   * Import Angular"s modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),

    /**
     * This section will import the `DevModuleModule` only in certain build types.
     * When the module is not imported it will get tree shaked.
     * This is a simple example, a big app should probably implement some logic
     */
    ...environment.showDevModule ? [ DevModuleModule ] : [],
  ],
  /**
   * Expose our Services and Providers into Angular"s dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS,
    FoodDatabaseService,
    CalculationService
  ]
})
export class AppModule {}
