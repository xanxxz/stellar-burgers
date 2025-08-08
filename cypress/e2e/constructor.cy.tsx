/// <reference types="cypress" />

context('🧪 Конструктор бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      statusCode: 200,
      fixture: 'ingredients',
    }).as('ingredients');

    cy.visit('/');
    cy.get('[data-burger-ingredient]').as('ingredient');
  });

  it('Отображает ингредиенты', () => {
    cy.contains('Биокотлета из марсианской Магнолии');
    cy.contains('Краторная булка N-200i');
  });

  it('Ингредиенты доступны для добавления', () => {
    cy.get('@ingredient')
      .its('length')
      .should('be.gte', 1);
  });

  it('Добавляет ингредиент в конструктор', () => {
    cy.get('@ingredient').first().as('firstIngredient');
    cy.get('@firstIngredient').find('button').click();

    cy.get('[data-constructor]')
      .should('contain.text', 'Краторная булка N-200i');
  });

  it('Добавленный ингредиент появляется в списке конструктора', () => {
    cy.contains('[data-burger-ingredient]', 'Биокотлета из марсианской Магнолии')
      .find('button')
      .click();

    cy.get('[data-constructor]')
      .should('contain.text', 'Биокотлета из марсианской Магнолии');
  });
});

context('🪟 Модальные окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      statusCode: 200,
      fixture: 'ingredients',
    }).as('ingredients');

    cy.visit('/');
    cy.get('[data-burger-ingredient]').as('ingredient');
  });

  it('Открывает модальное окно с ингредиентом', () => {
    cy.get('@ingredient').first().click();

    cy.get('#modals > *').should('have.length', 2);
    cy.get('[data-test="ingredient-title"]').should('contain.text', 'Краторная булка N-200i');
  });

  it('Закрывает модальное окно по крестику', () => {
    cy.get('@ingredient').first().click();

    cy.get('#modals > *').should('have.length', 2);
    cy.get('[data-modal-close]').click();

    cy.get('#modals > *').should('have.length', 0);
  });

  it('Не открывает модалку при клике вне ингредиента', () => {
    cy.get('body').click('topLeft');
    cy.get('#modals > *').should('have.length', 0);
  });
});

context('🧾 Создание заказа', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'mocked_access_token');
    localStorage.setItem('refreshToken', 'mocked_refresh_token');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as('ingredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' }).as('user');
    cy.intercept('POST', 'api/orders', { fixture: 'order' }).as('order');

    cy.visit('/');
    cy.get('[data-burger-ingredient]').as('ingredient');
  });

  it('Создает заказ, показывает номер и очищает конструктор', () => {
    cy.get('@ingredient').first().find('button').click();

    cy.contains('[data-burger-ingredient]', 'Биокотлета из марсианской Магнолии')
      .find('button')
      .click();

    cy.get('[data-order-button]').click();

    cy.wait('@order').then((interception) => {
      expect(interception.response).to.exist;

      const ingredients = interception.request.body.ingredients;
      expect(ingredients).to.be.an('array').and.not.empty;

      const orderNumber = interception.response!.body.order.number;

      cy.get('#modals > *')
        .should('have.length', 2)
        .and('contain.text', orderNumber);
    });

    cy.get('[data-modal-close]').click();

    cy.get('#modals > *').should('have.length', 0);

    cy.get('[data-constructor]')
      .find('[data-burger-ingredient]')
      .should('not.exist');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});
