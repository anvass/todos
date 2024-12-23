describe('Проверка работоспособности App', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('input[type="text"]').should('be.visible');
    cy.get('input[type="text"]').type('Купить корм коту{enter}');
    cy.get('input[type="text"]').type('Покормить кота{enter}');
    cy.get('input[type="text"]').type('Погладить кота{enter}');
  });

  it('Добавление новой задачи после ввода текста в input и нажатия клавиши enter', () => {
    cy.get('input[type="text"]').should('be.visible');

    cy.get('input[type="text"]').type('Сделать todo-лист{enter}');

    const todoItems = cy.get('.chakra-checkbox-card__root');
    todoItems.should('have.length', 4);
    todoItems.contains('Сделать todo-лист');
  });

  it('Можно пометить задачу как выполненную/невыполненную', () => {
    cy.get('.todoItems label:nth-child(1)').click();
    cy.get('.todoItems label:nth-child(1) [type="checkbox"]').should(
      'be.checked'
    );

    cy.get('.todoItems label:nth-child(1)').click();
    cy.get('.todoItems label:nth-child(1) [type="checkbox"]').should(
      'not.be.checked'
    );
  });

  it('Фильтрация задач', () => {
    // выполняем первую задачу (Купить корм коту)
    cy.get('.todoItems label:nth-child(1)').click();
    cy.get('.todoItems label:nth-child(1) [type="checkbox"]').should(
      'be.checked'
    );

    // проверка выполненных задач
    cy.contains('Completed').click();
    cy.get('.todoItems .chakra-checkbox-card__root').should('have.length', 1);
    cy.get('.todoItems .chakra-checkbox-card__root').contains(
      'Купить корм коту'
    );

    // проверка активных задач, не должны содержать выполненную выше задачу
    cy.contains('Active').click();
    cy.get('.todoItems .chakra-checkbox-card__root').should('have.length', 2);
    cy.get('.todoItems .chakra-checkbox-card__root').contains('Покормить кота');
    cy.get('.todoItems .chakra-checkbox-card__root').should(
      'not.contain',
      'Купить корм коту'
    );

    // проверяем, что в списке есть все задачи
    cy.contains('All').click();
    cy.get('.todoItems .chakra-checkbox-card__root').should('have.length', 3);
    cy.get('.todoItems .chakra-checkbox-card__root').contains(
      'Купить корм коту'
    );
    cy.get('.todoItems .chakra-checkbox-card__root').contains('Покормить кота');
    cy.get('.todoItems .chakra-checkbox-card__root').contains('Погладить кота');
  });

  it('Удаление выполненных задач из списка', () => {
    // проверяем число элементов в списке
    cy.get('.todoItems .chakra-checkbox-card__root').should('have.length', 3);

    // выполняем вторую задачу (Купить корм коту)
    cy.get('.todoItems label:nth-child(2)').click();
    cy.get('.todoItems label:nth-child(2) [type="checkbox"]').should(
      'be.checked'
    );

    // кликаем кнопку удаления выполненных задач
    cy.contains('Clear completed').click();

    // проверяем, что в списке осталось два элемента и выполненный ранее отсутствует
    cy.get('.todoItems .chakra-checkbox-card__root').should('have.length', 2);
    cy.get('.todoItems .chakra-checkbox-card__root').should(
      'not.contain',
      'Покормить кота'
    );
  });
});
