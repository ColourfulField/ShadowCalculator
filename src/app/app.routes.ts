import { Routes } from "@angular/router";
import { AboutComponent } from "./components/demo/about";
import { NoContentComponent } from "./components/demo/no-content";
import { HomeComponent } from "./components/home/home.component";

export const ROUTES: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "**", component: NoContentComponent},
];
