import { Units } from './../../../../../shared/models/units.enum';
import { DailyWeather, Weather } from './../../../../../shared/models/weather';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import * as moment from 'moment-timezone';

@Component({
  selector: 'wea-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyWeatherComponent {

  @Input() unit: Units;
  @Input() dailyWeather: DailyWeather;
  @Input() timeZone: string;

  get weather(): Weather {
    return this.dailyWeather.weather;
  }

  get date(): string {
    return moment.unix(this.dailyWeather.date).format('DD MMM - dddd');
  }

  get icon(): string {
    return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`;
  }

  unixToHourMinute(value: number): string {
    return moment.unix(value).tz(this.timeZone).format('HH:mm');
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
