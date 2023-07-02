import { NgModule } from '@angular/core';
import { ArticleComponent } from './article.component';
import { CommonModule } from '@angular/common';
import { EditModule } from 'src/app/shared/modules/editor.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ARTICLE_ROUTES } from './article.router';
import { StoreModule } from '@ngrx/store';
import { articleReducer } from './store/article.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from './store/article.effects';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    EditModule,
    FormsModule,
    RouterModule.forChild(ARTICLE_ROUTES),
    StoreModule.forFeature("article", articleReducer),
    EffectsModule.forFeature(ArticleEffects)
  ],
})
export class ArticleModule {}
