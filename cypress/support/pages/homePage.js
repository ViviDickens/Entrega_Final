export class HomePage {
    constructor() {
      this.onlineShopLink = '#onlineshoplink'
    }
  
    clickOnlineShop() {
      cy.get(this.onlineShopLink).click();
    }
  }

