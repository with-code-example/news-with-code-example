import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { ConfigService } from './services/config.service';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Tech News';
  public isMobile: boolean = true

  mobileQuery: MediaQueryList;
  // fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;

  public sidenavItems: any[] = [];
  public config: any = { sidenav: true };
  public children: any[] = [];
  public opened = false;
  public colorScheme: any = '';
  public sideNavMode = <MatDrawerMode>'side';
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private configService: ConfigService,
    private router: Router,
    private observer: BreakpointObserver
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const navMain = document.getElementById('navbarCollapse');
      if (navMain) {
        navMain.onclick = function onClick() {
          if (navMain) {
            navMain.classList.remove('show');
          }
        };
      }
    }

    if (localStorage.getItem('theme')) {
      this.colorScheme = localStorage.getItem('theme');
    } else {
      if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
        this.colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';
      } else {
        this.colorScheme = 'dark';
      }
      localStorage.setItem('theme', this.colorScheme);
    }
    this.configService.sidenavData();
    this.configService.currentSidenavData.subscribe((data: any) => {
      this.sidenavItems = data;
    });
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 1024px)']).subscribe((res) => {
      if (res.matches) {
        this.isMobile = true
        this.sideNavMode = 'over';
        this.opened = false;
      } else {
        this.isMobile = false
        this.sideNavMode = 'side';
        this.opened = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  toggle() {
    this.opened = !this.opened;
    document.body.scrollTo(-100, 0);
  }

  changeColor() {
    if (this.colorScheme == 'dark') {
      localStorage.setItem('theme', 'light');
      this.colorScheme = 'light';
    } else {
      localStorage.setItem('theme', 'dark');
      this.colorScheme = 'dark';
    }
  }

  hasChildren(item: any): boolean {
    return item && item.children && item.children.length > 0;
  }

  sidenav() {
    // this.configService.changeData({sidenav: !this.config.sidenav});
    this.opened = !this.opened;
  }

  navigateTo(route: string, feed: any = '') {
    if(this.isMobile){
      this.toggle()
    }
    this.router.navigate([route], { state: { data: { feed } } });
  }
}
