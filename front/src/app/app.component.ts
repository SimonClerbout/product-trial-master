import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CacheService } from "./core/services/Cache.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, CommonModule],
})
export class AppComponent implements OnInit {
  router = inject(Router);
  cacheService = inject(CacheService);
  title = "ALTEN SHOP";
  cartItemsCount: number = 0;

  ngOnInit(): void {
    this.cacheService.cartChanges.subscribe(cart => {
      this.cartItemsCount = cart.length;
    });
  }

  goToCart(){
    this.router.navigate(['/cart']);
  }
}
