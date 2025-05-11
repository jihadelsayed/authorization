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
  public language = 'en'; // default fallback

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      let hostname = window.location.hostname;
      let origin = window.location.origin;
      let lang = window.navigator.language?.substring(0, 2) || 'en';

      // ✅ Force domain and language if on localhost
      if (hostname.includes('localhost')) {
        hostname = 'neetechs.com';
        origin = 'https://neetechs.com';
        lang = 'en';
      }

      this.mainDomain = hostname;
      this.frontEndUrl = origin;
      this.language = lang;
      this.serverUrl = `https://server.${hostname}/`;
      this.serverUrlWithoutSlash = this.serverUrl.slice(0, -1);
      this.chatUrl = `wss://server.${hostname}/ws/chat/`;
      this.loginUrl = `https://accounts.${hostname}/${lang}/`;
    }
  }
}
