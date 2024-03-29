import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  constructor(@Inject(LOCALE_ID) public localeId: string) { }
  frameSrc = environment.LoginURL + window.navigator.language.substring(0, 2)+"/#/getCredential"+"?"+ "host="+ window.location.href+"&"+"language="+ window.navigator.language.slice(0, 2) +"&" + "pathname="+window.location.pathname;
  ngOnInit() {
    //console.log("va"+this.frameSrc);
    //(document.getElementById('iframeAccount')as any)["src"] = this.frameSrc;

    // Authorization
    if (localStorage.getItem("userToken") || null == null) {
      const topWindow:any = window.top;
      topWindow.addEventListener("message", (event:any) => {
        if (localStorage.getItem("userToken") || null == null) {

          if (event.origin ===  window.location.protocol + '//' + window.location.host) {
            return;
          } else {
            //console.log( window.location.protocol + '//' + window.location.host)
            //console.log(event)

            if (event.data['type'] === "credential") {
              if (event.data.getToken !== 'undefined') {
                if (localStorage.getItem("userToken") !== event.data.getToken) {
                  localStorage.setItem("userToken", event.data.getToken)
                  localStorage.setItem("UserInfo", event.data.getUserInfo)
                  localStorage.setItem("darkMode", event.data.darkMode || true)
                  topWindow.removeEventListener("message", event)
                  window.location.reload()
                }

              }
            }
          }
        }
      }, false);
    }
    (document.getElementById('iframeAccount')as any)["src"] = this.frameSrc;

    console.log(this.frameSrc)
  }

}
