import { Component, OnInit } from '@angular/core';
declare var window:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    window.init_modal(
      {
        modalBtnWrapperId: 'menu-wrapper',
        subCategoryDataUrl: 'https://dummyjson.com/products/category/',
        modalOpenBtnText: 'Contact Service',
        formHeading: 'Assign to Task to Store Manager'
      }
    )
  }

  title = 'custom_dynamic_both';
}

