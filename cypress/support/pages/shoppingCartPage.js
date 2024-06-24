export class ShoppingCartPage {
  verificarProducto(nombre) {
    return cy.get('li').contains(nombre);
  }

  verificarPrecio(producto) {
    cy.get('li').contains(producto.nombre).siblings(`[data-cy="unitPrice"]`)
      .should('have.text', `$${producto.precioUnitario.toFixed(2)}`);
    cy.get('li').contains(producto.nombre).siblings(`[data-cy="totalPrice"]`)
      .should('have.text', `$${(producto.precioUnitario * producto.quantity).toFixed(2)}`);
  }

  verificarCantidad(producto) {
    cy.get('li').contains(producto.nombre).siblings(`[data-cy="productAmount"]`)
      .should('have.text', `${producto.quantity}`);
  }

verificarPrecioTotal(precioTotal) {
    cy.get('#price b').should('have.text', `${precioTotal.toFixed(2)}`);
}

}
  