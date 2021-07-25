
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

    auth0 = new auth0.WebAuth({
        clientID: 'uWsi2Zlc4JT6SGVwI5lGf7TNL3nD67xm',
        domain: 'com644-stuart.eu.auth0.com',
        responseType: 'token id_token',
        audience: 'https://com644-stuart.eu.auth0.com/userinfo',
        redirectUri: 'http://localhost:4200/callback',
        scope: 'openid profile'
    });

    userProfile: any;

    constructor(public router: Router) { }

    public login(): void {
        sessionStorage.url = window.location.href;
        this.auth0.authorize();
    }
    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken &&
                authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult);
                this.router.navigate(['/']);
            } else if (err) {
                this.router.navigate(['/']);
                console.log(err);
            }
        });
    }
    public getProfile(cb): void {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('Access token must exist to fetch profile');
        }

        const self = this;
        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                self.userProfile = profile;
            }
            cb(err, profile);
        });
    }

    private setSession(authResult): void {
        const expiresAt = JSON.stringify(
            (authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token',
            authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }
    public logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        //this.router.navigate(['/']);
    }
    public isAuthenticated(): boolean {
        const expiresAt =
            JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}