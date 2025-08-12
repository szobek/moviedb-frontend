import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  getUsers: WritableSignal<boolean> = signal(false);
  setActions(action: boolean) {
    this.getUsers.set(action);
  }
  constructor() {}
}
