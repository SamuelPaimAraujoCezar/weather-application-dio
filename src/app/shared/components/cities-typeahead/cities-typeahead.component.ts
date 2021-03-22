import { CitiesService } from './../../services/cities.service';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { CityTypeaheadItem } from './../../models/city-typeahead-item';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, EventEmitter, Optional, Self } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'wea-cities-typeahead',
  templateUrl: './cities-typeahead.component.html',
  styleUrls: ['./cities-typeahead.component.scss']
})
export class CitiesTypeaheadComponent implements OnInit, ControlValueAccessor {

  @Input() titulo: string;

  dataSource$: Observable<CityTypeaheadItem[]>;
  searchControl: FormControl = new FormControl('');

  loading: boolean;
  private onChange: (value: CityTypeaheadItem) => void;
  private onTouched: () => void;

  constructor(@Optional() @Self() public control: NgControl, private citiesService: CitiesService) {
    control.valueAccessor = this;
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(() => this.loading = true);

    this.searchControl.valueChanges
      .pipe(debounceTime(600))
      .subscribe((query: string) => {
        this.dataSource$ = this.citiesService.getCities(query);
        this.loading = false;
      });
  }

  onSelect(event): void {
    this.onChange(event.option.value);
    this.searchControl.reset();
  }

  registerOnChange(fn: (value: CityTypeaheadItem) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  writeValue() {
  }

}
