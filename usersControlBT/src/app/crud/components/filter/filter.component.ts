import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public filterusers:string='';
  @Output() filt = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  filter(){
    this.filt.emit(this.filterusers);
  }

}
