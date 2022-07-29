import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  isLoading!: Boolean;
  constructor(loading:LoadingService) {
    loading.isLoading.subscribe((isLoading)=>{
      this.isLoading = isLoading;
    });

  }

  ngOnInit(): void {
  }

}
