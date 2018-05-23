import { AfterViewInit, Component, ElementRef, Input, EventEmitter, Output, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/observable/fromEvent";

@Component({
  selector: "slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements AfterViewInit {
  @Input() public min: number;
  @Input() public max: number;
  @Input() public value: number;
  @Output() public valueChanged = new EventEmitter<number>();

  @ViewChild("slider") public slider: ElementRef;

  public ngAfterViewInit(): void {
    Observable.fromEvent(this.slider.nativeElement, "input")
              .subscribe(() => this.valueChanged.emit(this.slider.nativeElement.value));
  }
}
