/// <reference types = "Cypress"/>

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() =>{
    cy.visit('./src/index.html')
  })

  it('Verificar o titulo da aplicação', () => {
    cy.title().should('be.equal', "Central de Atendimento ao Cliente TAT")
  })

  it('Preenche os campos obrigatórios e envia o formulário', () =>{
    var longText = 'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste testeteste testeteste testeteste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste';

    cy.get('#firstName').type('Vinicius');
    cy.get('#lastName').type('Lima');
    cy.get('#email').type('teste@gmail.com');
    cy.get('#phone').type('4599999999');
    cy.get('#open-text-area').type(longText, {delay: 0});
    cy.get('button[type="submit"]').click();
    
    cy.get('.success').should('be.visible');

  })

  it('Exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', () =>{
    cy.get('#firstName').type('Vinicius');
    cy.get('#lastName').type('Lima');
    cy.get('#email').type('teste@gmail,com');
    cy.get('#phone').type('4599999999');
    cy.get('#open-text-area').type('teste');
    cy.get('button[type="submit"]').click();

    cy.get('.error').should('be.visible');
  })
  
  it('Campo telefone se mantém vaio quando preenchido telefone com valor não-numerico', () =>{
    cy.get('#phone')
      .type('abcdefjh')
      .should('have.value', '');
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório, porém não e preenchid antes do envio', ()=>{
    cy.get('#firstName').type('Vinicius');
    cy.get('#lastName').type('Lima');
    cy.get('#email').type('teste@gmail,com');
    cy.get('#phone-checkbox').check();
    cy.get('#open-text-area').type('teste');
    cy.get('button[type="submit"]').click();

    cy.get('.error').should('be.visible');
  })

  it('Preenche e limpa os campos nome, sobrenome, e-mail e telefone', () => {
    cy.get('#firstName')
      .type('Vinicius')
      .should('have.value', 'Vinicius')
      .clear()
      .should('have.value', '');

    cy.get('#lastName')
      .type('Lima')
      .should('have.value', 'Lima')
      .clear()
      .should('have.value', '');
    
    cy.get('#email')
      .type('teste@gmail.com')
      .should('have.value', 'teste@gmail.com')
      .clear()
      .should('have.value', '');
    
    cy.get('#phone')
      .type('4599999999')
      .should('have.value', '4599999999')
      .clear()
      .should('have.value', '');
  })
  
  it('Exibe mensagem de erro ao enviar relatório sem preencher campos obrigatórios', ()=>{
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible')
  })

  it('Envia o formulário com sucesso usando um comando customizado', () =>{
    cy.fillMandatoryFieldsAndSubmit();

    cy.get('.success').should('be.visible');
  })

  it('Encontra botão enviar com o método contains', () =>{
    cy.fillMandatoryFieldsWithParameters('Vinicius', 'Lima', 'teste@gmail.com', 459999999, 'teste');
    cy.contains('button', 'Enviar').click();
  })

  it('Realizando validação de selects', () => {
    //cy.get('#product').select('Blog') //Seleção pelo texto Blog
    cy.get('#product')
      .select('youtube') //Seleção pelo value youtube
      .should('have.value', 'youtube');
    //cy.get('#product').select(1) //Seleção pelo indice 1.
  })

  it('Realizando validação de inputs do tipo radio e checkbox', () =>{
    cy.fillMandatoryFieldsWithParameters('Vinicius', 'Lima', 'teste@gmail.com', 459999999, 'teste');

    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('have.value', 'elogio');

    cy.get('#email-checkbox')
      .check()
      .should('be.checked');
  })

  it('Marca todos os radio button', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio)
          .check()
          .should('be.checked')
      })
  })

  it('Marca e desmarca checkbox', () => {
    //Trabalhando com condicional - Utilizando then()
    cy.get('#email-checkbox') //Pega elemento
      .check() //Marca elemento
      .should('be.checked')//Verifica elemento marcado
      .then(function (check) { //Realiza a função de verificar se o elemento marcado está realmente marcado, se estiver desmarca o elemento.
        if (check) { //Este exemplo é apenas para demonstrar que podemos trabalhar com funções e a propria linguagem javascript.
          cy.get('#email-checkbox')
            .uncheck()
            .should('not.be.checked')
        } else {
          return
        }
      })

    /// --- Podemos fazer desta forma também, o que seria o correto. ------
    // cy.get('#email-checkbox') //Pega elemento
    //   .check() //Marca elemento
    //   .should('be.checked')//Verifica elemento marcado
    //   .then(function () {
    //     cy.get('#email-checkbox')
    //       .uncheck()
    //       .should('not.be.checked')
    //   });
  })

  it.only('Utilizando multiplas tab', () => {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank');

    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing')
      .should('be.visible');

    //Exemplo de como abrir outra janela linkada.
  }) 

  



})
