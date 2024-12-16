import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading = false;

  show(): void {
    this.loading = true;
    console.log('Loading started...');
  }

  hide(): void {
    this.loading = false;
    console.log('Loading finished...');
  }

  isLoading(): boolean {
    return this.loading;
  }
}
