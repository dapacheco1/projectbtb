import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-crud',
  templateUrl: './header-crud.component.html',
  styleUrls: ['./header-crud.component.scss']
})
export class HeaderCrudComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('');

  }
}
