import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, // xác định loại token
      useClass: TokenInterceptorService, // xác định service hoặc class (use class TokenInterceptorService)
      multi: true, // cho phép cung cấp nhiều giá trị cho cùng một token.
      // inShort: cho phép nó can thiệp vào mỗi yêu cầu HTTP được tạo trong ứng dụng.
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
