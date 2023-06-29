import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {routes} from "./app.routes";

@Component({
  selector: 'hd-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatListModule, RouterLink, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  routes = [...routes.filter((map)=> map.title)];
}
