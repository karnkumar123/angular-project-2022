
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { ShoppingListComponent } from "./shopping-list.component"
import { ShoppingListService } from "./shopping-list.service";
import { SHOPPING_ITEMS } from '../../mock-data/test-data/shopping-list-items';
import { DebugElement } from "@angular/core";
import {By} from '@angular/platform-browser';
import { of } from "rxjs";

fdescribe('component: ShoppingListComponent', () => {

    let component: ShoppingListComponent;
    let fixture: ComponentFixture<ShoppingListComponent>;
    let el: DebugElement;
    let shoppingListServiceSpy: any;
    beforeEach(waitForAsync(() => {
        shoppingListServiceSpy = jasmine.createSpyObj('ShoppingListService', 
                                        ['getIngredients'], 
                                        ['ingredientsAdded', 'editemItemIndexObservable']);
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
               {provide: ShoppingListService, usevalue: shoppingListServiceSpy}
            ],
            declarations: [
                ShoppingListComponent
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ShoppingListComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            fixture.detectChanges();
        })
    }))

    it('should create component', () => {
        expect(component).toBeTruthy();
    })

    it('should show ingredients', () => {
        component.ingredients = SHOPPING_ITEMS;
        fixture.detectChanges();
        const allIngredients = el.queryAll(By.css('a'));
        expect(allIngredients.length).toBe(SHOPPING_ITEMS.length);
        allIngredients.forEach((ingredientElement, index) => {
            let indexOfSpace = (<string>ingredientElement.nativeElement.innerHTML).trim().indexOf(' ');
            let ingredientName = (<string>ingredientElement.nativeElement.innerHTML).substring(0,indexOfSpace+1);
            expect(ingredientName.trim()).toBe(SHOPPING_ITEMS[index].name);
        })
    })

    it('should get ingredients from service on ngOnInit', () => {
        shoppingListServiceSpy.getIngredients.and.returnValues(of(SHOPPING_ITEMS));
        component.ngOnInit();
        // fixture.whenStable().then(() => {
        //     console.log('Sita->', component.ingredients);
        // })
        setTimeout(() => {
            console.log('Sita->', component.ingredients);
        }, 3000)
        
    })
})