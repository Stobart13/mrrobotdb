import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ProfileComponent } from './profile.component';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    episodeForm;

    episode = {
        name: '',
        season: '',
        episodeNumber: '',
        airdate: '',
        runtime: '',
        image: '',
        summary: '',
        
    }
     constructor(private webService: WebService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private authService: AuthService) {
            this.episodeForm = formBuilder.group({
                name: ['', Validators.required],
                season: ['', Validators.required],
                airdate: ['', Validators.required],
                episodeNumber: ['', Validators.required],
                runtime: ['', Validators.required],
                image: ['', Validators.required],
                summary: ['', Validators.required]
            });
        }
    
    onSubmit() {
        this.webService.addEpisode(this.episode);
        this.episodeForm.reset();
    }

     isInvalid(control) {
        return this.episodeForm.controls[control].invalid &&  this.episodeForm.controls[control].touched;
     }

     isIncomplete() {
         return this.isInvalid('name') || this.isInvalid('season') || this.isInvalid('episodeNumber') || this.isInvalid('airdate') || this.isInvalid('runtime') || this.isInvalid('image') || this.isInvalid('summary')
     }
     
}