import { Component, OnInit, AfterContentInit, AfterViewInit, OnDestroy } from '@angular/core';
import { InitService, DOMAINAPI, showLoadingScreen, hideLoadingScreen } from '../../shared/init.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as fromProductReducer from '../../store/product.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hotProduct: Observable<fromProductReducer.State>;
  saleProduct: Observable<fromProductReducer.State>;
  newProduct: Observable<fromProductReducer.State>;
  constructor(private initService: InitService, private httpClient: HttpClient) { }

  ngOnInit() {
    showLoadingScreen();
    this.initService.setupStuff();
    this.httpClient.get(DOMAINAPI + 'home', {
      observe: 'body'
    }).subscribe(
      (response: any) => {
        this.hotProduct = response[0].hot;
        this.newProduct = response[1].new;
        this.saleProduct = response[2].sale;
        hideLoadingScreen();
      }
    );
  }

}
