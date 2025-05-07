import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RuntimeConfigService } from './services/runtime-config.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  frameSrc = '';
  isBrowser = false;

  constructor(
    private config: RuntimeConfigService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;

      const lang = window.navigator.language.substring(0, 2);
      const host = window.location.href;
      const pathname = window.location.pathname;

      this.frameSrc = `${this.config.loginUrl}${lang}/#/getCredential?host=${host}&language=${lang}&pathname=${pathname}`;

      const iframe = document.getElementById('iframeAccount') as any;
      if (iframe) iframe.src = this.frameSrc;

      if (!localStorage.getItem("userToken")) {
        const messageHandler = (event: any) => {
          if (!localStorage.getItem("userToken")) {
            if (event.origin !== window.location.origin) {
              if (event.data?.type === "credential" && event.data.getToken) {
                localStorage.setItem("userToken", event.data.getToken);
                localStorage.setItem("UserInfo", event.data.getUserInfo);
                localStorage.setItem("darkMode", event.data.darkMode || "true");
                window.removeEventListener("message", messageHandler);
                window.location.reload();
              }
            }
          }
        };

        window.addEventListener("message", messageHandler, false);
      }

      console.log(this.frameSrc);
    }
  }
}
