import {NgModule} from "@angular/core";
import {UsersComponent} from "./users.component";
import {UsersRoutingModule} from "./users-routing";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [UsersComponent],
    imports: [
        CommonModule,
        UsersRoutingModule
    ]
})
export class UsersModule {

}
