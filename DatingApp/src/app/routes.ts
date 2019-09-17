import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberDetailResover } from './_resolvers/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResover } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MemberListResover } from './_resolvers/member-list.resolver';
import { ListResover } from './_resolvers/list.resolver';

export const appRouts: Routes = [

    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },

    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: {users: MemberListResover} },
            { path: 'members/:id', component: MemberDetailsComponent,
            resolve: { user: MemberDetailResover } },
            { path: 'member/edit', component: MemberEditComponent,
            resolve: { user: MemberEditResover }, canDeactivate: [PreventUnsavedChanges] },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListComponent, resolve: {users: ListResover} },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },

];
