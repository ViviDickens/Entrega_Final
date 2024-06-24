export class ReciptPage {

    constructor() {
        this.sellid = '[data-cy="sellId"]'
        this.name = 'p[data-cy="name"]'
        this.CreditCard = '[data-cy="creditCard"]';
        this.totalPrice = "span#creditCard";
        this.thankyouButton = '[data-cy="thankYou"]';
    }

    clickThankYouButton() {
        cy.get(this.thankYouButton).click();
    }
}

