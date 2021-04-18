let user

describe('Bloglist', function() {

  beforeEach(function () {
    window.localStorage.removeItem('loggedUser')

    // cy.intercept('GET', '/api/blogs').as('getBlogs')

    user = {
      name: 'User Name',
      username: 'username',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.request('POST', 'http://localhost:3000/api/users', user)
    cy.visit('http://localhost:3000')
    // cy.wait('@getBlogs')
  })

  it('login form is shown', function() {
    cy.get('#usernameField').should('not.be.visible')
    cy.contains('Login').click()
    cy.get('#usernameField').should('be.visible')
  })

  it('login fails with wrong password', function() {
    cy.contains('Login').click()
    cy.get('#usernameField').type(user.username)
    cy.get('#passwordField').type('invalid_password_42l322g1')
    cy.get('#loginButton').click()

    cy.get('.error').should('contain', 'Invalid username or password')
    cy.get('html').should('not.contain', `${user.name} logged in`)
  })

  it('login forms exists and login is working', function() {
    cy.contains('Login').click()
    cy.get('#usernameField').type(user.username)
    cy.get('#passwordField').type(user.password)
    cy.get('#loginButton').click()

    cy.contains(`${user.name} logged in`)
  })

  it('front page can be opened', function() {
    cy.contains('Bloglist')
    cy.contains('Blogs')
    // cy.login({ usename: 'username', password: 'password' })
  })

  describe('when logged in', function() {

    beforeEach(function() {
      cy.login({ username: 'username', password: 'password' })
    })

    it('user is logged in', () => {
      cy.contains('logged in')
    })

    it('a blog can be created', function () {
      cy.contains('New Blog').click()

      cy.get('#titleField').type('NewBlogTitle')
      cy.get('#authorField').type('NewBlogAuthor')
      cy.get('#urlField').type('NewBlogUrl.com')
      cy.get('#newBlogButton').click()

      cy.contains('NewBlogTitle')
      cy.contains('NewBlogAuthor')
    })

    describe('and several blogs exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'TestBlog1', author: 'TestAuthor1', url: 'test.com' })
        cy.createBlog({ title: 'TestBlog2', author: 'TestAuthor2', url: 'test2.com' })
        cy.createBlog({ title: 'TestBlog3', author: 'TestAuthor3', url: 'test3.com' })
      })

      it('blogs exist', function() {
        cy.contains('TestBlog1')
        cy.contains('TestAuthor1')
        cy.contains('TestBlog2')
        cy.contains('TestAuthor2')
        cy.contains('TestBlog3')
        cy.contains('TestAuthor3')
      })

      it('blog can be liked', function() {
        cy.createBlog({ title: 'BlogToLike', author: 'TestAuthor', url: 'test.com' })
        cy.contains('BlogToLike').closest('.blog').as('blogDiv')
        cy.get('@blogDiv').find('.viewButton').click()
        cy.get('@blogDiv').find('.likeButton').click()
        cy.get('@blogDiv').contains('Likes: 1')
      })

      it('blog can be removed by user who created it', function() {
        cy.createBlog({ title: 'BlogToRemove', author: 'TestAuthor', url: 'test.com' })
        cy.contains('BlogToRemove').closest('.blog').as('blogDiv')
        cy.get('@blogDiv').find('.viewButton').click()
        cy.get('@blogDiv').find('.removeButton').click()
        cy.wait(1000) // This was required for some reason
        cy.contains('BlogToRemove').should('not.exist')
      })

      it('blogs are sorted by like count', function() {
        cy.contains('TestBlog1').closest('.blog').as('blog1')
        cy.get('@blog1').find('.viewButton').click()
        cy.get('@blog1').find('.likeButton').click()
        cy.get('@blog1').contains('Likes: 1')

        cy.contains('TestBlog2').closest('.blog').as('blog2')
        cy.get('@blog2').find('.viewButton').click()
        cy.get('@blog2').find('.likeButton').click()
        cy.get('@blog2').contains('Likes: 1')
        cy.get('@blog2').find('.likeButton').click()
        cy.get('@blog2').contains('Likes: 2')

        cy.get('.blogTitle').then(blogs => {
          return blogs.map((index, blog) => Cypress.$(blog).text()).get()
        })
          .should('deep.equal',
            ['TestBlog2', 'TestBlog1', 'TestBlog3']
          )

      })

    })

  })

})