import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { SessionService } from "app/session.service";
import { LocalStorageUser } from 'models/user.model';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private session: SessionService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {
    return this.session.isAdmin();
  }
}
