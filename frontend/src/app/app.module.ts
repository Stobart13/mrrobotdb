import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { CallbackComponent } from './callback.component';

import { AppComponent } from './app.component';
import { EpisodesComponent } from './episodes.component';
import { WebService } from './web.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav.component';
import { ProfileComponent } from './profile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { HomeComponent } from './home.component';
import { EpisodeComponent } from './episode.component';
import { ReviewsComponent } from './reviews.component';

var routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'episodes',
        component: EpisodesComponent
    },
    {
        path: 'episodes/:id',
        component: EpisodeComponent
    },
    {
        path: 'callback',
        component: CallbackComponent
    },
    {
        path: 'episodes/:id/reviews/:id2',
        component: ReviewsComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];

@NgModule({
    declarations: [
        AppComponent, EpisodesComponent, HomeComponent, EpisodeComponent, CallbackComponent, NavComponent, ReviewsComponent, ProfileComponent
    ],
    imports: [
        BrowserModule, HttpModule, RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule, NgxPaginationModule, FilterPipeModule
    ],
    providers: [WebService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }