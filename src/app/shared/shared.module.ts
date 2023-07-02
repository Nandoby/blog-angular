import { NgModule } from "@angular/core";
import { CardComponent } from "./components/card/card.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NotificationComponent } from "./components/notification/notification.component";

const modules = [
  CommonModule,
  RouterModule
]

const components = [CardComponent, NotificationComponent]

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [
    ...components,
    ...modules
  ]
})
export class SharedModule {}
