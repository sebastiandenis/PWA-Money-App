import { Component, OnInit, Input, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Budget } from '../../models/budget.model';
import { BudgetLine } from '../../models/budget-line.model';
import { User } from '../../../user/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { OnDestroy } from '@angular/core';
import * as BudgetActions from '../../store/actions/budget.actions';
import * as UiStateActions from '../../../core/store/uiState.actions';
import * as fromRoot from '../../../store/app.reducers';
import * as fromBudgetApp from '../../store/reducers/index';
import { DOCUMENT } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { BudgetLinesComponent } from '../budget-lines/budget-lines.component';

@Component({
  selector: 'app-budget-dashboard',
  templateUrl: './budget-dashboard.component.html',
  styleUrls: ['./budget-dashboard.component.css']
})
export class BudgetDashboardComponent implements OnInit, OnDestroy {


  lastOffset: number;
  budget$: Observable<Budget>;
  budgetLines$: Observable<BudgetLine[]>;
  user$: Observable<User>;
  userSubscription: Subscription;

  constructor(translate: TranslateService,
    private store: Store<fromRoot.AppState>,
    private router: Router) {
    this.user$ = this.store.select(fromRoot.selectUser);
    this.budget$ = this.store.select(fromBudgetApp.selectCurrentBudget);


  }

  ngOnInit() {
    this.store.dispatch(new UiStateActions.ChangeTitleAction('budgettitle'));
    this.store.dispatch(new UiStateActions.ChangeMainMenuBtnVisibleAction(true));
    this.lastOffset = 0;
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onAddFastExpense(): void {
    this.router.navigate(['addFastExpense']);

  }
}