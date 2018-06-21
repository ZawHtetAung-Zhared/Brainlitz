import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { appService } from './app.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private appService: appService ) { }

    canActivate(): boolean {
        return this.appService.isLoggedIn();
    }
}