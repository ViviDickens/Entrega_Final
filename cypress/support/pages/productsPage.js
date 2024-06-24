export class ProductsPage {
  agregarProducto(producto, cantidad) {
      for (let i = 0; i < cantidad; i++) {
          cy.contains(producto.nombre).click();
          this.clickOnAddToCart(producto);
          this.clickOnModal();
      }
  }

  clickOnAddToCart(producto) {
      cy.get(`[data-cy=add-to-cart-${producto.id}]`, { timeout: 10000 }).should('be.visible').click();
  }

  clickOnModal() {
      cy.get('#closeModal').click();
  }

  clickShoppingCart() {
      cy.get('#goShoppingCart').click();
  }
}

