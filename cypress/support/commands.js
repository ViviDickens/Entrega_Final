import 'cypress-xpath';

Cypress.Commands.add('loginAPI', (usuario, contraseña) => {
    cy.request({
        method: "POST",
        url: "https://pushing-it.onrender.com/api/login",
        body: {
            username: usuario,
            password: contraseña
        }
    }).then(respuesta => {
        window.localStorage.setItem('token', respuesta.body.token);
        window.localStorage.setItem('user', respuesta.body.user.username);  // Cambié 'respuesta.body.username' a 'respuesta.body.user.username'
        window.localStorage.setItem('userId', respuesta.body.user._id);
    });
});

Cypress.Commands.add('deleteUserAPI', () => {
    const token = window.localStorage.getItem('token');
    const username = window.localStorage.getItem('user');
    
    cy.log(`Token: ${token}`);
    cy.log(`Username: ${username}`);
    
    cy.request({
        method: 'DELETE',
        url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        failOnStatusCode: false
    }).then(response => {
        expect(response.status).to.eq(202);
    });
});