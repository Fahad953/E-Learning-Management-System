import { Component, AfterViewInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { DashboardService } from '../services/dashboard.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	responseMessage: any;
	data: any;
	ngAfterViewInit() { }

	constructor(
		private DashboardService: DashboardService,
		private snackbarService: SnackbarService
	) {
		this.dashboardData();
	}
	dashboardData(){
		this.DashboardService.getDetails().subscribe((response:any)=>{
			this.data = response;	
			console.log(this.data);
		},(error:any)=>{
			console.log(error);
			if(error.error?.message){
				this.responseMessage = error.error?.message;
			}
			else{
				this.responseMessage = GlobalConstants.genericError;
			}
			this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
				
		})
	}
}
