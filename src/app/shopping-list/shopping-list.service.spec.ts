import { flush, TestBed } from "@angular/core/testing";
import { Logger } from "../shared/logger.service";
import { ShoppingListService } from "./shopping-list.service";
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

// MOCK DATA
import {SHOPPING_ITEMS, SHOPPING_ITEMS_BY_ID} from '../../mock-data/test-data/shopping-list-items';
import { Ingredient } from "../shared/ingredients.model";
import { HttpErrorResponse } from "@angular/common/http";

describe('service: ShoppingListService', () => {
    let shoppingListService: ShoppingListService;
    let loggerSpy: any;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        loggerSpy = jasmine.createSpyObj('Logger', ['logMessage']);
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ShoppingListService,
                {provide: Logger, useValue: loggerSpy}
            ]
        })
        shoppingListService = TestBed.inject(ShoppingListService);
        httpTestingController = TestBed.inject(HttpTestingController);
    })

    afterEach(() => {
        httpTestingController.verify();
    })

    it('function: getIngredients', () => {
        shoppingListService.getIngredients().subscribe((shoppingItems) => {
            expect(shoppingItems).toBeTruthy();
            expect(shoppingItems instanceof Array).toBeTrue();
            expect(shoppingItems.length).toBe(3);
            const ingredient = shoppingItems.find(ingredient => ingredient.id === 5 );
            expect(ingredient?.name.toUpperCase()).toEqual('BREAD');
            expect(ingredient?.amount).toBe(12);
        })

        const testRequest = httpTestingController.expectOne('/api/ingredients');
        expect(testRequest.request.method).toBe('GET')
        testRequest.flush(SHOPPING_ITEMS);
    })

    it('function: getIngredient', () => {
        shoppingListService.getIngredient(2).subscribe((item: Ingredient) => {
            expect(item).toBeTruthy();
            expect(item.id).toEqual(2);
            expect(item.name).toBe('Wheat');
        })
        const testRequest = httpTestingController.expectOne('/api/ingredients/2');
        expect(testRequest.request.method).toBe('GET')
        testRequest.flush(SHOPPING_ITEMS_BY_ID(2))
    })

    it('function: addShoppingItem', () => {
        let item = {id: 10, name: 'Jeera', amount: 20};
        shoppingListService.addShoppingItem(item).subscribe((itemAdded) => {
            expect(itemAdded.id).toBe(10);
            expect(itemAdded.name).toBe('Jeera')
        })

        const testRequest = httpTestingController.expectOne('/api/ingredients');
        expect(testRequest.request.method).toBe('POST');
        testRequest.flush({
            name: 'Jeera',
            id: 10,
            amount: 20
        })
    })

    it('function: addShoppingItem failed', () => {
        let item = {id: 10, name: 'Jeera', amount: 20};
        shoppingListService.addShoppingItem(item)
        .subscribe({
            next: () => fail('Error occured'),
            error: (error: HttpErrorResponse) => {
                expect(error.status).not.toBe(200);
            }
        })


        const testRequest = httpTestingController.expectOne('/api/ingredients');
        expect(testRequest.request.method).toBe('POST');
        testRequest.flush('Internal error', {
            status: 500,
            statusText: 'Internal error occured'
        })
    })

    it('function: updateIngredient', () => {
        let id = 5,
            item = {
                id: 5,
                name: 'Chicken',
                amount: 100
            }

        shoppingListService.updateIngredient(id, item).subscribe((updatedItem) => {
            expect(updatedItem.name).toBe('Chicken');
            expect(updatedItem.amount).toBe(100);
            expect(updatedItem.id).toBe(5);
        });
        const testRequest = httpTestingController.expectOne('/api/ingredients/'+id);
        expect(testRequest.request.method).toBe('PATCH');
        testRequest.flush({
            id: 5,
            name: 'Chicken',
            amount: 100
        })
    })

    it('function: deleteIngredient', () => {
        let index = 12;
        shoppingListService.deleteIngredient(index).subscribe({
            next: (data) => {
                expect(data).toEqual({});
            }
        })
        const testRequest = httpTestingController.expectOne('/api/ingredients/'+index);
        expect(testRequest.request.method).toBe('DELETE');
        testRequest.flush({});
    })
})