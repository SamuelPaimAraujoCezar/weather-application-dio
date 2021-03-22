import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Units } from 'src/app/shared/models/units.enum';
import { CityWeather } from 'src/app/shared/models/weather';


@Component({
  selector: 'wea-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent {

  @Input() unit: Units;
  @Input() cityWeather: CityWeather;
  @Input() bookmarkOption: string;
  @Output() toggleBookmark = new EventEmitter();


  get cityName(): string {
    return `${this.cityWeather.city.name}, ${this.cityWeather.city.country}`;
  }

  onToggleBookmark(): void {
    this.toggleBookmark.emit();
  }
}

