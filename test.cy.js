import { slowCypressDown } from "cypress-slow-down"
import 'cypress-file-upload'

slowCypressDown(1000)

it('Testcase 1 - Register User',() => {

cy.visit('https://www.automationexercise.com/')
cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
cy.get('[data-qa="signup-name"]').type("Nila")
cy.get('[data-qa="signup-email"]').type("tasnim_test10@yopmail.com")
cy.get('[data-qa="signup-button"]').click()

cy.get('#id_gender2').check()  //radio button
cy.get('[data-qa="password"]').type("Abcd123@")

cy.get('[data-qa="days"]').select('1')    //dropdown
cy.get('[data-qa="months"]').select('August')  //dropdown
cy.get('[data-qa="years"]').select('1985')   //dropdown

cy.get('#newsletter').check() //checkbox
cy.get('#optin').check() //checkbox

cy.get('[data-qa="first_name"]').type("Nila")
cy.get('[data-qa="last_name"]').type("Naira")
cy.get('[data-qa="company"]').type("ABCD")
cy.get('[data-qa="address"]').type("15 Brooklyn RD")
cy.get('[data-qa="address2"]').type("Apt E")
cy.get('[data-qa="country"]').select('United States')
cy.get('[data-qa="state"]').type("New York")
cy.get('[data-qa="city"]').type("Buffalo")
cy.get('[data-qa="zipcode"]').type("23100")
cy.get('[data-qa="mobile_number"]').type("3117226444")
cy.get('[data-qa="create-account"]').click()

cy.get('b').should('have.text', "Account Created!")
cy.get('[data-qa="continue-button"]').click()

//logout
cy.get('.shop-menu > .nav > :nth-child(4) > a').click()

//account deleted
//cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
//cy.get('b').should('have.text', "Account Deleted!")
//cy.get('[data-qa="continue-button"]').click()

});

it('Testcase 2 - Login User',() => {

    cy.visit('https://www.automationexercise.com/')
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    cy.get('[data-qa="login-email"]').type("tasnim_test7@yopmail.com")
    cy.get('[data-qa="login-password"]').type("Abcd123@")
    cy.get('[data-qa="login-button"]').click();
    
    //logout
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    
});

it('Testcase 3 - Account Deleted',() => {

    cy.visit('https://www.automationexercise.com/')
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    cy.get('[data-qa="login-email"]').type("tasnim_test1@yopmail.com")
    cy.get('[data-qa="login-password"]').type("Abcd123@")
    cy.get('[data-qa="login-button"]').click();

    //account deleted
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
    cy.get('b').should('have.text', "Account Deleted!")
    cy.get('[data-qa="continue-button"]').click()
});


it('Testcase 4 - Contact Us Form',() => {

    cy.visit('https://www.automationexercise.com/')
    cy.get('.shop-menu > .nav > :nth-child(8) > a').click()

    cy.get('[data-qa="name"]').type("Nila")
    cy.get('[data-qa="email"]').type("tasnim_test7@yopmail.com")
    cy.get('[data-qa="subject"]').type("Can't edit my personal information")
    cy.get('[data-qa="message"]').type("I can't change my address.")
 
    //file upload
    cy.fixture('example.pdf').then(fileContent => {
        cy.get('input[type="file"]').attachFile({
          fileContent,
          fileName: 'example.pdf',
          mimeType: 'application/pdf'
        });
    });

    cy.get(':nth-child(6) > .form-control').focus()
   
    cy.get('[data-qa="submit-button"]').click()
    cy.get('.status').should('contain', "Success! Your details have been submitted successfully.")
    cy.get('#form-section > .btn').click()
});


it('Testcase 5 - Verify All Products and Product Detail Page and Give a Review',() => {

    cy.visit('https://www.automationexercise.com/')
    cy.get('.shop-menu > .nav > :nth-child(2) > a').click()
    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click()

    cy.get('.product-information > h2').should('contain', "Blue Top")
    cy.get(':nth-child(6) > b').should('include.text', "Availability")
    cy.get(':nth-child(7) > b').should('include.text', "Condition")
    cy.get(':nth-child(8) > b').should('include.text', "Brand")

    cy.get('#name').type("Farzana")
    cy.get('#email').type("tasnimbony.wedding+test12@gmail.com")
    cy.get('#review').type("This product offers excellent performance with its accurate health tracking, sleek design, and user-friendly interface, making it a great choice for those seeking a stylish and functional wearable. However, its higher price and limited app integration may be drawbacks for some users.")
    cy.get('#button-review').click()
    
});


it('Testcase 6 - Place Order: Login before Checkout',() => {

    cy.visit('https://www.automationexercise.com/')
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()

    //cy.login('tasnim_test7@yopmail.com', 'Abcd123@');
    
    //Login
    cy.get('[data-qa="login-email"]').type("tasnim_test7@yopmail.com")
    cy.get('[data-qa="login-password"]').type("Abcd123@")
    cy.get('[data-qa="login-button"]').click()

    cy.get('.shop-menu > .nav > :nth-child(2) > a').click()

    //search first product
    cy.get('#search_product').type("Winter Top")
    cy.get('#submit_search').click()
    cy.get('.choose > .nav > li > a').click()

    //increment-decrement textbox
    //increment product quantity
    cy.get('#quantity').invoke('val').then((value) => {
        
        const currentValue = parseInt(value, 10);
  
        // Increment the value
        const newValue = currentValue + 2;

        // deincrement the value
        //const newValue = currentValue - 1;
  
        // Set the new value in the input field
        cy.get('#quantity').clear().type(newValue);
    })

    cy.get(':nth-child(5) > .btn').click()
    cy.get('.modal-title').should('contain','Added!')
    cy.get('.modal-footer > .btn').click() //continue shopping

    cy.get('.shop-menu > .nav > :nth-child(2) > a').click()

    //Search 2nd Product
    cy.get('#search_product').type("Fancy Green Top")
    cy.get('#submit_search').click()
    cy.get('.productinfo > .btn').click()
    cy.get('.modal-title').should('contain','Added!')
    cy.get('u').click()

    cy.get('#product-5 > .cart_delete > .cart_quantity_delete').click() //remove product from card

    cy.get('.col-sm-6 > .btn').click()

    cy.get(':nth-child(2) > .heading').should('contain','Address Details')
    cy.get(':nth-child(4) > .heading').should('contain','Review Your Order')
    cy.get('h4 > b').should('contain','Total Amount')

    cy.get('.form-control').type(" Please ensure the package is delivered before 3 PM. Also, if possible, include a gift receipt with the order.")
    cy.get(':nth-child(7) > .btn').click()
    
    cy.get('.heading').should('contain',"Payment")
    cy.get('[data-qa="name-on-card"]').type("Naira")
    cy.get('[data-qa="card-number"]').type("000011112222")
    cy.get('[data-qa="cvc"]').type("156")
    cy.get('[data-qa="expiry-month"]').type("11")
    cy.get('[data-qa="expiry-year"]').type("2024")
    cy.get('[data-qa="pay-button"]').click()

    cy.get('[data-qa="order-placed"] > b').should('contain','Order Placed!')

    cy.get('.col-sm-9 > .btn-default').click()
    cy.get('[data-qa="continue-button"]').click()
});