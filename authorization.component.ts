import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  constructor() { }
  LoginURL = environment.LoginURL;
  frameSrc:any
  ngOnInit() {
    // Authorization
    if (localStorage.getItem("userToken") == null) {
      const topWindow:any = window.top;
      topWindow.addEventListener("message", (event:any) => {
        if (localStorage.getItem("userToken") == null) {
          // if (event.origin === "http://localhost:4200/"
          // || event.origin === "https://theislamicnation.web.app/"
          // || event.origin === "https://theislamicnation.com/") {
          //   return;
          // } else {
          //   if (event.data['type'] === "credential") {
          //     if (event.data.getToken !== 'undefined') {
                localStorage.setItem("userToken", event.data.getToken)
                localStorage.setItem("UserInfo", event.data.getUserInfo)
          //     }
          //   }
          // }
        }
      }, false);
    }

    this.frameSrc= this.LoginURL+ window.navigator.language.substring(0, 2)+"/#/getCredential"+"?"+ "host="+ window.location.href+"&"+"language="+ window.navigator.language +"&" + "pathname="+window.location.pathname;
    (document.getElementById('iframeAccount')as any)["src"] = this.frameSrc;
    console.log(this.frameSrc)
  }

}