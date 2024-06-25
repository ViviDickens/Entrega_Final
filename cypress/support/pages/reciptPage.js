export class ReciptPage {

    constructor() {
        this.sellid = '[data-cy="sellId"]'
        this.name = 'p[data-cy="name"]'
        this.creditCard = '[data-cy="creditCard"]';
        this.totalPrice = '[data-cy="totalPrice"]';
        this.thankyouButton = '[data-cy="thankYou"]';
    }

    ClickthankyouButton() {
        cy.get(this.thankyouButton).click();
    }
}

