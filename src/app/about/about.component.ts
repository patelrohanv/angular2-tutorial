import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeadershipService } from '../services/leadership.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[];


  constructor(private leadershipservice: LeadershipService) { }

  ngOnInit() {
    this.leadershipservice.getLeaders().subscribe(leaders => this.leaders = leaders);

  }

}
