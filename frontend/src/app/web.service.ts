import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class WebService {

    private episodes_private_list = [];
    epsisodesSubject = new Subject();
    episode_list = this.epsisodesSubject.asObservable();

    private episode_private_list = [];
    private episodeSubject = new Subject();
    episode = this.episodeSubject.asObservable();

    private reviews_private_list = [];
    private reviewsSubject = new Subject();
    reviews = this.reviewsSubject.asObservable();

    private review_private_list = [];
    private reviewSubject = new Subject();
    review = this.reviewSubject.asObservable();

    private user_review_list
    private userReviewSubject = new Subject();
    userReviews = this.userReviewSubject.asObservable();


    constructor(private http: Http, private router: Router) { }

    episodeID;
    reviewID;

    getEpisodes() {
        return this.http.get(
            'http://localhost:3000/api/episodes')
            .subscribe(response => {
                this.episode_private_list = response.json();
                this.epsisodesSubject.next(this.episode_private_list);
            })
    }

    getEpisode(id) {
        return this.http.get(
            'http://localhost:3000/api/episodes/' + id)
            .subscribe(response => {
                this.episode_private_list = [];
                this.episode_private_list.push(response.json());
                this.episodeSubject.next(this.episode_private_list);
                this.episodeID = id;
            })
    }

    getReviews(id) {
        this.http.get(
            'http://localhost:3000/api/episodes/' + id + '/reviews')
            .subscribe(response => {
                this.reviews_private_list = response.json();
                this.reviewsSubject.next(this.reviews_private_list);
                var reviewCount = this.reviews_private_list.length;
                return reviewCount;
            })
    }

    getReview(id, id2) {
        this.http.get(
            'http://localhost:3000/api/episodes/' + id + '/reviews/' + id2)
            .subscribe(response => {
                this.review_private_list = [];
                this.review_private_list.push(response.json());
                this.reviewsSubject.next(this.review_private_list);
                this.episodeID = id;
                this.reviewID = id2;
            })
    }

     postReview(review, name) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', name);
        urlSearchParams.append('text', review.review);
        urlSearchParams.append('stars', review.stars);

        this.http.post(
            "http://localhost:3000/api/episodes/" +review.episodeID + "/reviews",
            urlSearchParams)
            .subscribe(
            response => {
                this.getReviews(review.episodeID);
            })
    }

    addEpisode(episode) {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('name', episode.name);
        urlSearchParams.append('season', episode.season);
        urlSearchParams.append('episodeNumber', episode.episodeNumber);
        urlSearchParams.append('airdate', episode.airdate);
        urlSearchParams.append('runtime', episode.runtime);
        urlSearchParams.append('image',episode.image);
        urlSearchParams.append('summary', episode.summary);

        this.http.post("http://localhost:3000/api/episodes", urlSearchParams)
        .subscribe(
                response => {
                    this.getEpisodes();

                }
        )
    }

    showUserReviews(id, id2, name) {
        this.http.get(
            'http://localhost:3000/api/episodes/' + id + '/reviews/' + id2+ "?name=" +name)
            .subscribe(response => {
                this.review_private_list = [];
                this.review_private_list.push(response.json());
                this.reviewsSubject.next(this.review_private_list);
                this.episodeID = id;
                this.reviewID = id2;
            })
    }

    deleteEpisode(episode) {
        this.http.delete("http://localhost:3000/api/episodes/" + episode.episodeID)
        .subscribe(
                response => {
                    this.router.navigate(['/episodes']);
                }
        )
    }
}