import { Component } from '@angular/core';
import { WebService } from './web.service';
import { FilterPipeModule } from 'ngx-filter-pipe';

@Component({
    selector: 'episodes',
    templateUrl: './episodes.component.html',
    styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent {

        episode: any[] = [];
        episodeFilter: any = { name: '' };

    constructor(private webService: WebService) { }


    ngOnInit() {
        // if (sessionStorage.start) {
        //     this.start = sessionStorage.start;
        // }
        this.webService.getEpisodes();
    }
}
