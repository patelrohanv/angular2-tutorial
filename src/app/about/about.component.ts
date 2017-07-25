import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeadershipService } from '../services/leadership.service';
import { flyInOut } from '../animations/app.animation';
import { expand } from '../animations/app.animation';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];


  constructor(private leadershipservice: LeadershipService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.leadershipservice.getLeaders().subscribe(leaders => this.leaders = leaders);

  }

}
