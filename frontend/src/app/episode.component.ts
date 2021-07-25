import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ProfileComponent } from './profile.component'
import { FilterPipeModule } from 'ngx-filter-pipe';


@Component({
    selector: 'episode',
    templateUrl: './episode.component.html',
    styleUrls: ['./episode.component.css']
})
export class EpisodeComponent {
    profile: any;
    reviewForm;

     deleteEpisode = {
        episodeID: ''
    }
    
    reviews: any[] = [];
    reviewFilter = { username: ''};

    review = {
        episodeID: '',
        name: '',
        review: '',
        stars: 5
    }

    constructor(private webService: WebService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private authService: AuthService) {
        this.reviewForm = formBuilder.group({
            name: ['', Validators.required],
            review: ['', Validators.required],
            stars: 5
        });
    }

    ngOnInit() {
        this.webService.getEpisode(this.route.snapshot.params.id);
        this.webService.getReviews(this.route.snapshot.params.id);

        if (this.authService.userProfile) {
            this.profile = this.authService.userProfile;
        } else {
            this.authService.getProfile((err, profile) => {
                this.profile = profile;
            });
        }
    }

    onSubmit() {
        this.review.episodeID = this.webService.episodeID;
        this.webService.postReview(this.review, this.profile.name);
        this.reviewForm.reset();
    }

    isInvalid(control) {
        return this.reviewForm.controls[control].invalid && this.reviewForm.controls[control].touched;
    }

    isIncomplete() {
        return this.isInvalid('review');
    }
    onDelete() {
        this.deleteEpisode.episodeID = this.webService.episodeID;
        this.webService.deleteEpisode(this.deleteEpisode);
}
    episode;
}