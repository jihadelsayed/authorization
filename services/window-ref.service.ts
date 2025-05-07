import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {
  get nativeWindow(): Window | undefined {
    return typeof window !== 'undefined' ? window : undefined;
  }
}
