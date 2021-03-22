import { Units } from './../../models/units.enum';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Weather } from '../../models/weather';

@Component({
  selector: 'wea-detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedWeatherComponent {

  @Input() unit: Units;
  @Input() weather: Weather;

  get weatherIcon(): string {
    return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`;
  }

  get getUnit(): string {
    switch (this.unit) {
      case Units.Metric:
        return '°C';
      case Units.Imperial:
        return '°F';
      case Units.SI:
        return 'K';
    }
  }
}
