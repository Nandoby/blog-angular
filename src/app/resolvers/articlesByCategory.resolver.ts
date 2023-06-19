import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Article} from "../shared/interfaces/article/article.interface";
import {inject} from "@angular/core";
import {ArticlesService} from "../shared/services/articles.service";

export const articlesByCategoryResolver: ResolveFn<Article[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ArticlesService).findArticlesByCategory(route.paramMap.get('id'));
};
