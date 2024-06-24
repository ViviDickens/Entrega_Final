import { ProductsPage } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { OnlineShopPage } from "../support/pages/onlineShopPage";
import { HomePage } from "../support/pages/homePage";
import { CheckoutPage } from '../support/pages/checkoutPage';
import { ReciptPage } from "../support/pages/reciptPage";

describe('Prueba de compra', () => {
    let productosData;
    let clienteData;
    const username = 'Pushingit' + Math.floor(Math.random() * 1000);
    const password = '123456!';
    const gender = 'Female';
    const day = '4';
    const month = 'August';
    const year = '1952';

    before('Registrar y cargar datos de productos y cliente', () => {
        cy.registerAPI(username, password, gender, day, month, year).then(() => {
            cy.fixture('datosProductos').then(datos => {
                productosData = datos;
            });

            cy.fixture('datosCliente').then(datos => {
                clienteData = datos;
                console.log(clienteData);  
            });
        });
    });

    beforeEach('Iniciar sesión y verificar usuario', () => {
        cy.loginAPI(username, password).then(() => {
            cy.visit('/');
        });
    });

    after('Eliminar usuario', () => {
        cy.deleteUserAPI();
    });

    it('Agregar productos al carrito y verificar', () => {
        const homePage = new HomePage();
        const productsPage = new ProductsPage();
        const shoppingCartPage = new ShoppingCartPage();
        const onlineShopPage = new OnlineShopPage();
        const checkoutPage = new CheckoutPage();
        const reciptPage = new ReciptPage();

        homePage.clickOnlineShop();

        expect(productosData).to.exist;
        expect(clienteData).to.exist;

        productsPage.agregarProducto(productosData.productos.primerProducto, productosData.productos.primerProducto.quantity);
        productsPage.agregarProducto(productosData.productos.segundoProducto, productosData.productos.segundoProducto.quantity);

        productsPage.clickShoppingCart();

        shoppingCartPage.verificarProducto(productosData.productos.primerProducto.nombre).should('exist');
        shoppingCartPage.verificarPrecio(productosData.productos.primerProducto);
        shoppingCartPage.verificarCantidad(productosData.productos.primerProducto);

        shoppingCartPage.verificarProducto(productosData.productos.segundoProducto.nombre).should('exist');
        shoppingCartPage.verificarPrecio(productosData.productos.segundoProducto);
        shoppingCartPage.verificarCantidad(productosData.productos.segundoProducto);

        onlineShopPage.clickOnShowTotalPrice();

        const totalPrice = (productosData.productos.primerProducto.precioUnitario * productosData.productos.primerProducto.quantity) +
                           (productosData.productos.segundoProducto.precioUnitario * productosData.productos.segundoProducto.quantity);

        shoppingCartPage.verificarPrecioTotal(totalPrice);

        cy.get('[data-cy="goBillingSummary"]').click();
        cy.get('[data-cy="goCheckout"]').click();

        checkoutPage.typeName(clienteData.cliente.name);
        checkoutPage.typeLastname(clienteData.cliente.lastname);
        checkoutPage.typeCardNumber(clienteData.cliente.cardNumber);  
        checkoutPage.clickPurchase();

        cy.get(reciptPage.name).should('contain.text', `${clienteData.cliente.name} ${clienteData.cliente.lastname}`);
        cy.get(reciptPage.creditCard).should('contain.text', clienteData.cliente.cardNumber);
        cy.get(reciptPage.totalPrice).should('contain.text', totalPrice.toFixed(2));

        reciptPage.clickThankYouButton(); 
    });
});
