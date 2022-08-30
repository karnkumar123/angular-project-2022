import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appToggleDropdown]'
})
export class DropdownDirective{
    @HostBinding('class.open') isOpen: boolean = false;
    @HostListener('click') toggle(){
        this.isOpen = !this.isOpen;
    }
}