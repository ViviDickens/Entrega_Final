export class CheckoutPage {
    constructor() {
        this.nameInput = '[data-cy="firstName"]';
        this.lastnameInput = '[data-cy="lastName"]';
        this.cardNumberInput = '[data-cy="cardNumber"]';
        this.purchaseButton = '[data-cy="purchase"]';
    }

    typeName(name) {
        cy.get(this.nameInput).type(name);
    }

    typeLastname(lastname) {
        cy.get(this.lastnameInput).type(lastname);
    }

    typeCardNumber(cardNumber) {
        cy.get(this.cardNumberInput).type(cardNumber);
    }

    clickPurchase() {
        cy.get(this.purchaseButton).click();
    }
}
