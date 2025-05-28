const {
  Given,
  Then,
  When,
} = require("@badeball/cypress-cucumber-preprocessor");
const { expect } = require("chai");

const BACKEND_ENDPOINT_TASKS = Cypress.env("BACKEND_ENDPOINT") + "/tasks";
const HEADERS = {
  "Content-Type": "application/json",
};

var last_new_task_id, first_tasks_status_id;

// Scenario: Criar uma nova tarefa com sucesso
Given("que a API está rodando", () => {
  cy.request({
    method: "GET",
    url: BACKEND_ENDPOINT_TASKS,
    headers: { ...HEADERS },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

When("eu envio uma requisição POST com corpo válido", () => {
  3;
  cy.fixture("tasks/tasks.json").then((tasks) => {
    cy.request({
      method: "POST",
      url: BACKEND_ENDPOINT_TASKS,
      headers: { ...HEADERS },
      body: JSON.stringify({
        text: tasks[0].text,
      }),
      failOnStatusCode: false,
    }).as("response");
  });
});

Then("o status da resposta deve ser 201", () => {
  cy.get("@response").then((response) => {
    expect(response.status).to.eq(201);
  });
});

Then('o corpo da resposta deve conter o "id" da tarefa cadastrada', () => {
  cy.get("@response").then((response) => {
    expect(response.body).all.keys("id", "message");
    last_new_task_id = response.body.id;
  });
});

// Scenario: Consultar tarefa pelo ID

Given("que a tarefa a ser pesquisada exista", () => {
  cy.wrap(last_new_task_id).should("exist");
});

When("eu envio uma requisição para obter detalhes da tarefa", () => {
  cy.wrap(last_new_task_id).then((id) => {
    cy.request({
      method: "GET",
      url: `${BACKEND_ENDPOINT_TASKS}/${id}`,
      headers: { ...HEADERS },
      failOnStatusCode: false,
    })
      .as("response")
      .then((response) => {
        cy.log(JSON.stringify(response.body));
      });
  });
});

Then("ao retornar os detalhes da tarefa recebo o código 200", () => {
  cy.get("@response").then((response) => {
    expect(response.status).to.eq(200);
  });
});

Then(
  'o corpo da tarefa deve conter "id", "text", "status", "data de criação"',
  () => {
    cy.get("@response").then((response) => {
      // creation: data de criação/registro
      expect(response.body).to.have.all.keys(
        "id",
        "text",
        "status",
        "creation",
      );
    });
  },
);

// Scenario: Atualizar status de uma tarefa

Given("que a tarefa a ser atualizada exista", () => {
  cy.wrap(last_new_task_id).should("exist");
});

When(
  "eu envio uma requisição para atualizar o status da tarefa para {string}",
  (task_status) => {
    cy.log("var .feature: " + task_status);

    cy.wrap(last_new_task_id).then((id) => {
      cy.request({
        method: "PUT",
        url: `${BACKEND_ENDPOINT_TASKS}/${id}`,
        headers: { ...HEADERS },
        body: JSON.stringify({
          status: task_status,
        }),
        failOnStatusCode: false,
      })
        .as("response")
        .then((response) => {
          cy.log(JSON.stringify(response.body));
        });
    });
  },
);

Then("ao atualizar status da tarefa recebo o código 200", () => {
  cy.get("@response").then((response) => {
    expect(response.status).to.eq(200);
  });
});

Then(
  "ao atualizar o status da tarefa o corpo da resposta deve conter uma mensagem de sucesso",
  () => {
    cy.get("@response").then((response) => {
      expect(response.body).to.have.all.keys("message");
    });
  },
);

// Scenario: Tentar atualizar uma tarefa com um status que não existe

// Given ("que a tarefa a ser atualizada exista", () => {})

// When ("eu envio uma requisição para atualizar o status da tarefa para {string}", (task_status) => {})

Then("ao tentar atualizar com o status inexistente recebo o código 400", () => {
  cy.get("@response").then((response) => {
    expect(response.status).to.eq(400);
  });
});

Then("o corpo da resposta deve conter uma mensagem de erro", () => {});

// Scenario: Atualizar texto de uma tarefa

// Given ("que a tarefa a ser atualizada exista", () => {})

When("eu envio uma requisição para atualizar o texto da tarefa", () => {
  cy.fixture("tasks/tasks.json").then((tasks) => {
    cy.wrap(last_new_task_id).then((id) => {
      cy.request({
        method: "PUT",
        url: `${BACKEND_ENDPOINT_TASKS}/${id}`,
        headers: { ...HEADERS },
        body: JSON.stringify({
          text: tasks[1].text,
        }),
        failOnStatusCode: false,
      })
        .as("response")
        .then((response) => {
          cy.log(JSON.stringify(response.body));
        });
    });
  });
});

Then("ao atualizar texto da tarefa recebo o código 200", () => {
  cy.get("@response").then((response) => {
    expect(response.status).to.eq(200);
  });
});

Then("o corpo da resposta deve conter uma mensagem de sucesso", () => {
  cy.get("@response").then((response) => {
    expect(response.body).to.have.all.keys("message");
  });
});

// Scenario: Listar todas as tarefas
Given("que existem tarefas cadastradas", () => {
  //
});

When("eu envio uma requisição para obter todas as tarefas", () => {
  cy.request({
    method: "GET",
    url: BACKEND_ENDPOINT_TASKS,
    headers: { ...HEADERS },
    failOnStatusCode: false,
  }).as("response");
});

Then("o status da resposta para o GET deve ser 200", () => {
  cy.get("@response").then((response) => {
    expect(response.status).to.eq(200);
  });
});

Then("o corpo da resposta deve conter uma lista de tarefas", () => {
  cy.get("@response").then((response) => {
    expect(response.body).to.be.an("array");
  });
});

Then(
  'cada tarefa retornada deve conter "id", "text", "status", "creation"',
  () => {
    cy.get("@response").then((response) => {
      response.body.forEach((task) => {
        // creation: data de criação/registro
        expect(task).to.have.all.keys("id", "text", "status", "creation");
      });
    });
  },
);

// Scenario: Deletar uma tarefa existente
Given("que uma tarefa recém criada existe", () => {
  cy.wrap("@last_new_task_id").should("exist");
});

When("eu envio uma requisição DELETE", () => {
  cy.wrap(last_new_task_id).should("exist");
  cy.wrap(last_new_task_id).then((id) => {
    cy.log("last_new_task_id: " + id);

    cy.request({
      method: "DELETE",
      url: `${BACKEND_ENDPOINT_TASKS}/${id}`,
      headers: { ...HEADERS },
      failOnStatusCode: false,
    }).as("response");
  });
});

Then("o status da resposta para o DELETE deve ser 200", () => {
  cy.get("@response").then((response) => {
    //cy.log(JSON.stringify(response))
    expect(response.status).to.eq(200);
  });
});

// Scenario: Tentar deletar uma tarefa que não existe
Given("que acabei de deletar uma tarefa", () => {
  cy.wrap("@last_new_task_id").should("exist");
});

When('eu envio uma requisição DELETE com o "id" desta tarefa', () => {
  cy.wrap(last_new_task_id).then((id) => {
    cy.request({
      method: "DELETE",
      url: `${BACKEND_ENDPOINT_TASKS}/${id}`,
      headers: { ...HEADERS },
      failOnStatusCode: false,
    })
      .as("response")
      .then((response) => {
        cy.log(response.body);
      });
  });
});

Then("o status da resposta deve ser 400", () => {
  cy.get("@response").then((response) => {
    expect(response.status).to.eq(400);
  });
});

// Scenario: Listar opções de status de tarefa

Given("que existem opções de status de tarefa cadastradas", () => {
  cy.log(
    "Banco de dados inicializa com 2 opções de status de tarefa por padrão",
  );
});

When(
  "eu envio uma requisição para obter todas as opções de status de tarefas",
  () => {
    cy.request({
      method: "GET",
      url: `${BACKEND_ENDPOINT_TASKS}/status`,
      headers: { ...HEADERS },
      failOnStatusCode: false,
    }).as("response");
  },
);

Then("ao retornar todas as opções o status da resposta deve ser 200", () => {
  cy.get("@response").then((response) => {
    expect(response.status).to.eq(200);
  });
});

Then("o corpo da resposta deve conter uma lista de opções de status", () => {
  cy.get("@response").then((response) => {
    expect(response.body).to.be.an("Array");
  });
});

Then('cada opção de status retornado deve conter "id" e "title"', () => {
  cy.get("@response").then((response) => {
    // Id será usado em outros testes
    first_tasks_status_id = response.body[0].id;

    response.body.forEach((task_status) => {
      expect(task_status).to.have.all.keys("id", "title");
    });
  });
});

//Scenario: Consultar uma opção de status de tarefa pelo ID

Given("que a opção de status da tarefa existe", () => {
  cy.wrap(first_tasks_status_id).should("exist");
});

When("eu envio a requisição para obter detalhes da opção de status", () => {
  cy.wrap(first_tasks_status_id).then((id) => {
    cy.request({
      method: "GET",
      url: `${BACKEND_ENDPOINT_TASKS}/status/${id}`,
      headers: { ...HEADERS },
      failOnStatusCode: false,
    })
      .as("response")
      .then((response) => {
        cy.log(JSON.stringify(response.body));
      });
  });
});

Then("ao retornar os detalhes da opção de status recebo o código 200", () => {
  cy.get("@response").then((response) => {
    expect(response.status).to.eq(200);
  });
});

Then('o corpo da opção deve conter "id", "title"', () => {
  cy.get("@response").then((response) => {
    expect(response.body).to.have.all.keys("id", "title");
  });
});

// Scenario: Consultar uma opção de status de tarefa inexistente pelo ID

Given("que a opção de status da tarefa não existe", () => {
  first_tasks_status_id = 0;
});

// When ("eu envio a requisição para obter detalhes da opção de status", () => {})

Then("ao retornar os detalhes da opção de status recebo o código 400", () => {
  cy.get("@response").then((response) => {
    expect(response.status).to.eq(400);
  });
});
