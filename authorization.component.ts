import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RuntimeConfigService } from './services/runtime-config.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LoginPromptComponent } from './login-prompt/login-prompt.component';

@Component({
  standalone: true,
  imports: [CommonModule, LoginPromptComponent],
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
frameSrc: SafeResourceUrl = '';
  isBrowser = false;
  showLoginModal = false;
  constructor(
    private config: RuntimeConfigService,
    @Inject(PLATFORM_ID) private platformId: Object,
  private sanitizer: DomSanitizer
  ) {}

 ngOnInit() {
  if (!isPlatformBrowser(this.platformId)) return;

  this.isBrowser = true;

  const lang = window.navigator.language.substring(0, 2);
  const host = window.location.href;
  const pathname = window.location.pathname;

  const unsafeUrl = `${this.config.loginUrl}getCredential?host=${host}&language=${lang}&pathname=${pathname}`;
  this.frameSrc = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);

  // Attach the iframe src safely
  const iframe = document.getElementById('iframeAccount') as HTMLIFrameElement;
  if (iframe) iframe.src = this.frameSrc as string;

  // ✅ Unified listener for login_required or credential
  const messageHandler = (event: MessageEvent) => {
    if (event.origin !== "https://accounts.neetechs.com") return;

if (event.data?.type === "credential" && event.data.getToken) {
  if (!localStorage.getItem("userToken")) {
    localStorage.setItem("userToken", event.data.getToken);
    localStorage.setItem("UserInfo", event.data.getUserInfo);
    localStorage.setItem("darkMode", event.data.darkMode || "true");
    window.removeEventListener("message", messageHandler);
    window.location.reload();
  }
}


    if (event.data?.type === "login_required") {
      this.showLoginModal = true;
    }
  };

  window.addEventListener("message", messageHandler, false);
}


handleLoginPromptConfirm() {
  const redirect = `https://accounts.neetechs.com/en/signIn?host=${window.location.origin}&pathname=${window.location.pathname}&language=en`;
  window.location.href = redirect;
}

handleLoginPromptCancel() {
  this.showLoginModal = false;
}

}
