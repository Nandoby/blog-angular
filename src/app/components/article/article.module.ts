import { NgModule } from "@angular/core";
import { ArticleComponent } from "./article.component";
import { CommonModule } from "@angular/common";
import { EditModule } from "src/app/shared/modules/editor.module";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ARTICLE_ROUTES } from "./article.router";

@NgModule({
  declarations: [ArticleComponent],
  imports: [CommonModule, EditModule, FormsModule, RouterModule.forChild(ARTICLE_ROUTES)]
})
export class ArticleModule { }
