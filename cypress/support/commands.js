import 'cypress-xpath';

Cypress.Commands.add('registerAPI', (username, password, gender, day, month, year) => {
    cy.request({
        method: 'POST',
        url: 'https://pushing-it.onrender.com/api/register',
        body: {
            username,
            password,
            gender,
            day,
            month,
            year
        }
    }).then(response => {
        if (response.status === 201) {
            const newUser = response.body.newUser;
            expect(newUser).to.have.property('username', username.toLowerCase());
            expect(newUser).to.have.property('gender', gender);
            expect(newUser).to.have.property('day', day);
            expect(newUser).to.have.property('month', month);
            expect(newUser).to.have.property('year', year);

            window.localStorage.setItem('registeredUser', JSON.stringify(newUser));
            cy.log(`Usuario registrado: ${JSON.stringify(newUser)}`);
        } else {
            throw new Error(`Error de registro: ${response.status} - ${response.body.message}`);
        }
    });
});

Cypress.Commands.add('loginAPI', (usuario, contraseña) => {
    cy.log(`Intentando iniciar sesión con el usuario: ${usuario}`);
    cy.request({
        method: "POST",
        url: "https://pushing-it.onrender.com/api/login",
        body: {
            username: usuario,
            password: contraseña
        }
    }).then(respuesta => {
        cy.log(`Respuesta de inicio de sesión: ${JSON.stringify(respuesta.body)}`);
        if (respuesta.status === 201) {
            window.localStorage.setItem('token', respuesta.body.token);
            window.localStorage.setItem('user', respuesta.body.user.username);
            window.localStorage.setItem('userId', respuesta.body.user._id);
            cy.log(`Token: ${respuesta.body.token}`);
            cy.log(`User: ${respuesta.body.user.username}`);
            cy.log(`UserId: ${respuesta.body.user._id}`);
        } else {
            throw new Error(`Error de autenticación: ${respuesta.status} - ${respuesta.body.message}`);
        }
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
        }
    }).then(response => {
        expect(response.status).to.eq(202);
    });
});

