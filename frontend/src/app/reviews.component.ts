import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';


@Component({
    selector: 'reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
    voteForm;

    vote = {
        reviewID: '',
        funny: '',
        cool: '',
        useful: ''
    }

    constructor(private webService: WebService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private authService: AuthService) {
        this.voteForm = formBuilder.group({
            funny: '',
            cool: '',
            useful: ''
        });
    }

    ngOnInit() {
        this.webService.getEpisode(this.route.snapshot.params.id);
        this.webService.getReview(this.route.snapshot.params.id, this.route.snapshot.params.id2);
    }

    isInvalid(control) {
        return this.voteForm.controls[control].invalid;
    }

    isIncomplete() {
        return this.isInvalid('option')
    }
    reviews;
}
