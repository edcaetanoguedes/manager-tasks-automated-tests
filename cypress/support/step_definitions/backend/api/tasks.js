const {
  Given,
  Then,
  When,
} = require("@badeball/cypress-cucumber-preprocessor");
const { expect } = require("chai");

const BACKEND_ENDPOINT = "BACKEND_ENDPOINT";
const BACKEND_ENDPOINT_TASKS = Cypress.env(BACKEND_ENDPOINT) + "/tasks";
const HEADERS = {
  "Content-Type": "application/json",
};

let last_new_task_id;// Guarda o ID da última tarefa criada

// Scenario: Criar uma nova tarefa com sucesso
Given ("que a API está rodando", () => {
  cy.request({
    method: "GET",
    url: BACKEND_ENDPOINT_TASKS,
    headers: { ...HEADERS },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

When ("eu envio uma requisição POST com corpo válido", () => {3
  cy.fixture("tasks/tasks.json").then((tasks) => {
    cy.request({
      method: "POST",
      url: BACKEND_ENDPOINT_TASKS,
      headers: { ...HEADERS },
      body: JSON.stringify({
        text: tasks.text
      }),
      failOnStatusCode: false,
    }).as("response_new_task")
  });
});

Then("o status da resposta deve ser 201", () => {
  cy.get("@response_new_task")
  .then((response) => {
      expect(response.status).to.eq(201);
    });
});

Then('o corpo da resposta deve conter o "id" da tarefa cadastrada', () => {
  cy.get("@response_new_task")
  .then((response) => {
      expect(response.body).to.have.property("id");
      last_new_task_id = response.body.id;
      cy.log("last_new_task_id: ", response.body.id)
    });
});

// Scenario: Listar todas as tarefas
Given ("que existem tarefas cadastradas", () => {
  //
})

When ("eu envio uma requisição GET", () => {
  cy.request({
    method: "GET",
    url: BACKEND_ENDPOINT_TASKS,
    headers:{ ...HEADERS },
    failOnStatusCode: false
  }).as("response_list_task")
})

Then ("o status da resposta para o GET deve ser 200", () => {
  cy.get("@response_list_task")
  .then((response) => {
    expect(response.status).to.eq(200)
  })
})

Then ("o corpo da resposta deve conter uma lista de tarefas", () => {
  cy.get("@response_list_task")
  .then((response) => {
    expect(response.body).to.be.an("array")
  })
})

Then ('cada item da lista deve conter "id" e "text"', () => {
  cy.get("@response_list_task")
  .then((response) => {
    response.body.forEach(task => {
      expect(task).to.have.property("id");
      expect(task).to.have.property("text");
    });
  })
})


// Scenario: Deletar uma tarefa existente
Given ('que uma tarefa recém criada existe', () => {
  cy.wrap(last_new_task_id).should("exist")
  cy.log({"last_new_task_id": last_new_task_id})
})

When ('eu envio uma requisição DELETE', () => { 
  cy.request({
    method: "DELETE",
    url: `${BACKEND_ENDPOINT_TASKS}/${last_new_task_id}`,
    headers: { ...HEADERS },
    failOnStatusCode: false
  }).as("response_delete_task")
})

Then ('o status da resposta para o DELETE deve ser 200', () => {
  cy.get("@response_delete_task")
  .then((response) => {
    expect(response.status).to.eq(200)
  })
})

Then ('a tarefa recém deletada não deve mais existir', () => {
  cy.request({
    method: "GET",
    url: `${BACKEND_ENDPOINT_TASKS}/${last_new_task_id}`,
    headers: { ...HEADERS },
    failOnStatusCode: false
  })
  .then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.empty;
  })
})


//
Given ('que acabei de deletar uma tarefa', () => {
  cy.wrap(last_new_task_id).should("exist")
})

When ('eu envio uma requisição DELETE com o "id" desta tarefa', () => {
  cy.request({
    method: "DELETE",
    url: `${BACKEND_ENDPOINT_TASKS}/${last_new_task_id}`,
    headers: { ...HEADERS },
    failOnStatusCode: false
  }).as("response_delete_non_existent_task")
  .then((response) => {
    cy.log(response.body)
  })
  
})

Then ('o status da resposta deve ser 500', () => {
  cy.get("@response_delete_non_existent_task")
  .then((response) => {
    expect(response.status).to.eq(500)
  })
})

Then ('o corpo da resposta deve conter uma mensagem de erro', () => {
  cy.get("@response_delete_non_existent_task")
  .then((response) => {
    expect(response.body).to.have.property("error")
  })
})
