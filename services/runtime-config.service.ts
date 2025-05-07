import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class RuntimeConfigService {
  public serverUrl = '';
  public serverUrlWithoutSlash = '';
  public frontEndUrl = '';
  public chatUrl = '';
  public loginUrl = '';
  public mainDomain = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const hostname = window.location.hostname;
      const origin = window.location.origin;

      this.mainDomain = hostname;
      this.frontEndUrl = origin;
      this.serverUrl = `https://server.${hostname}/`;
      this.serverUrlWithoutSlash = this.serverUrl.slice(0, -1);
      this.chatUrl = `wss://server.${hostname}/ws/chat/`;
      this.loginUrl = `https://accounts.${hostname}/`;
    }
  }
}
