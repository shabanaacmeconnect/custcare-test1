import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ChevronDown } from 'lucide-angular';
import { MENU } from './menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit{
  menus;
  showmenu=true;
  constructor(private router:Router){

    this.menus=MENU;
   
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
      }
      if(window.location.pathname.includes('/companies') || window.location.pathname.includes('/invitations')){
        this.showmenu=false;
       }else{
        this.showmenu=true
       }
    });
  }
  ngAfterViewInit(): void {
    this._activateMenuDropdown();
  }
  hasItems(item: any) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }
 /**
   * remove active and mm-active class
   */
  _removeAllClass(className:string) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }
   /**
   * Activate the parent dropdown
   */
   _activateMenuDropdown() {
    // this._removeAllClass('side-menu--active');
    // this._removeAllClass('side-menu__sub-open');
    // const links :any= document.getElementsByClassName('side-menu');
    // let menuItemEl = null;
    // const paths = [];
    // for (let i = 0; i < links.length; i++) {
    //   paths.push(links[i]['pathname']);
    // }
    // var itemIndex = paths.indexOf(window.location.pathname);
    // if (itemIndex === -1) {
    //   const strIndex = window.location.pathname.lastIndexOf('/');
    //   const item = window.location.pathname.substr(0, strIndex).toString();
    //   menuItemEl = links[paths.indexOf(item)];
    // } else {
    //   menuItemEl = links[itemIndex];
    // }
    // if (menuItemEl) {
    //   menuItemEl.classList.add('side-menu--active');
    //   menuItemEl.classList.add('side-menu--open');
    //   const parentEl = menuItemEl.parentElement;
    //   if (parentEl) {
    //     parentEl.classList.add('side-menu--active');
    //     parentEl.classList.add('side-menu--open');
    //     if(parentEl.parentElement){
    //       const parent2El = parentEl.parentElement.closest('ul');
    //       if(parent2El){
    //         parent2El.classList.add('side-menu__sub-open');
    //         if(parent2El.parentElement){
    //           const parent3El = parent2El.parentElement.firstElementChild;
    //           parent3El.classList.add('side-menu--active');
    //           parent3El.classList.add('side-menu--open');
    //           if(parent3El.parentElement){
    //             const parent4El = parent3El.parentElement.closest('ul');
    //             if(parent4El){
    //               parent4El.classList.add('side-menu__sub-open');
    //               if(parent4El.parentElement){
    //                 const parent5El = parent4El.parentElement.firstElementChild;
    //                 parent5El.classList.add('side-menu--active');
    //                 parent5El.classList.add('side-menu--open');
    //               }
    //             }           
    //           }
    //         }
    //       }
         
    //     }
    //     let chvron=document.getElementsByClassName('side-menu--open');
    //     console.log(chvron);chvron[0].children[1].classList.add('transform')
    //     chvron[0].children[1].classList.add('rotate180')
    //     // let chvron=document.getElementsByClassName('side-menu');

    //   }
    // }

  }
}
