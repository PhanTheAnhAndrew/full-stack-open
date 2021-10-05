describe('Blog app', () => {
  beforeEach(() => {
    cy.request('GET', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'andrew',
      password: 'andrew',
      name: 'Andrew',
    };
    const user2 = {
      username: 'andrew1',
      password: 'andrew1',
      name: 'Andrew',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.request('POST', 'http://localhost:3003/api/users/', user2);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.contains('Log in to application');
  });

  describe('Login', () => {
    it('suceeds with correct credentials', () => {
      cy.get('#username').type('andrew');
      cy.get('#password').type('andrew');
      cy.get('#login-button').click();
      cy.contains('Andrew logged in');
    });

    it('fails with wrong credentials', () => {
      cy.get('#username').type('andrew');
      cy.get('#password').type('andrew1');
      cy.get('#login-button').click();
      cy
        .get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'andrew', password: 'andrew' });
    });

    it('A blog can be created', () => {
      cy.contains('create new blog').click();
      cy.get('#title').type('title');
      cy.get('#author').type('author');
      cy.get('#url').type('url');
      cy.get('#btn-create').click();
      cy.contains('a new blog title by author added');
    });

    describe('When blog is created', () => {
      beforeEach(() => {
        cy.createBlog({ title: 'title 1', author: 'author 1', url: 'url 1' });
      });

      it('like blog successfully', () => {
        cy.contains('title 1')
          .parent()
          .contains('view').click();
        cy.contains('title 1')
          .parent()
          .contains('like').click();
        cy.contains('a blog title 1 by author 1 updated');
      });

      it('delete blog successfully', () => {
        cy.contains('title 1')
          .parent()
          .contains('view').click();
        cy.contains('title 1')
          .parent()
          .contains('remove').click();
        cy.on('window:confirm', () => true);
        cy.contains('a blog title 1 by author 1 removed');
      });

      it ('delete blog fail with invalid user', () => {
        cy.contains('logout').click();
        cy.login({ username: 'andrew1', password: 'andrew1' });
        cy.contains('title 1')
          .parent()
          .contains('view').click();
        cy.contains('title 1')
          .parent()
          .contains('remove').click();
        cy.contains('invalid user');
      });
    });
    
    describe('Order blog', () => {
      beforeEach(() => {
        cy.createBlog({ title: 'title 1', author: 'author 1', url: 'url 1' });
        cy.createBlog({ title: 'title 2', author: 'author 2', url: 'url 2' });
      });

      it('the blogs are ordered according to likes', () => {
        cy.contains('title 1')
          .parent()
          .contains('view').click();
        cy.contains('title 1')
          .parent()
          .contains('like').click();
        cy.wait(1000);
        cy.get('.like-count').then((elems) => {
          const likes = elems.map((i, each) => each.innerText);
          expect([...likes]).to.deep.eq([...likes].sort((a, b) => b - a));
        });
      })
    });
  });
});