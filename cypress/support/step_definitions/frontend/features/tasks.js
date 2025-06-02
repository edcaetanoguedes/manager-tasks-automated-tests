const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const { expect } = require("chai");

const FRONTEND_URL = Cypress.env("FRONTEND_URL");
const BACKEND_ENDPOINT_TASKS = Cypress.env("BACKEND_ENDPOINT") + "/tasks";
const HEADERS = {
  "Content-Type": "application/json",
};

// Scenario: Criar uma nova tarefa com sucesso

let last_new_task, last_new_task_altered;

Given("que estou na página de tarefas", () => {
  cy.visit(`${FRONTEND_URL}`);
  cy.reload(true);
});

When("eu preencher o campo texto para a nova tarefa", () => {
  cy.fixture("tasks/tasks.json").then((tasks) => {
    last_new_task = { ...tasks[0], text: tasks[0].text };
    cy.log(JSON.stringify(last_new_task));

    cy.get("input#add-task").type(last_new_task.text);
  });
});

Then('eu clicar no botão "Adicionar" tarefa', () => {
  // Verifica se é originada uma mensagem positiva
  cy.on("window:alert", (msg) => {
    expect(msg).to.include("sucesso");
  });

  cy.intercept("POST", BACKEND_ENDPOINT_TASKS).as("response_submit");

  cy.get("button#add-task").click();

  cy.wait("@response_submit").then((interception) => {
    cy.log(interception.response.body);
    expect(interception.response.statusCode).to.eq(201);
    expect(interception.response.body).to.have.property("id");
    last_new_task = { ...last_new_task, id: interception.response.body.id };
  });
});

Then("a tarefa deve aparecer na lista de tarefas", () => {
  cy.reload(true);
  cy.wrap(last_new_task).should("exist");

  cy.get(`[data-id="${last_new_task.id}"]`).as("card_selected");

  // Futuramente: TESTAR informações exibidas
});

Then("a tarefa deve aparecer no banco de dados", () => {
  cy.wrap(last_new_task).then((task) => {
    cy.request({
      method: "GET",
      url: `${BACKEND_ENDPOINT_TASKS}`,
      headers: { ...HEADERS },
      failOnStatusCode: false,
    }).then((response) => {
      const found_task = response.body.find(
        (task) => task.text === last_new_task.text,
      );
      last_new_task = found_task;
      expect(found_task).to.not.be.undefined;
    });
  });
});

// Scenario: Tentar criar uma tarefa vazia

// Given ('que estou na página de tarefas', () => {})

When(
  "eu preencher o campo texto com um valor inválido para a nova tarefa",
  () => {
    // Obtém a qtd de tarefas cadastradas no db via api
    cy.request({
      method: "GET",
      url: `${BACKEND_ENDPOINT_TASKS}`,
      headers: { ...HEADERS },
      failOnStatusCode: false,
    })
      .then((response) => response.body.length)
      .as("array_tasks_length");

    cy.get("input#add-task").type(" ");
  },
);

Then('eu clicar no botão "Adicionar"', () => {
  // Verifica se é originada uma mensagem positiva
  cy.on("window:alert", (msg) => {
    expect(msg).to.not.include("sucesso");
  });

  cy.get("button#add-task").click();
});

Then("nenhuma tarefa nova deve aparecer na lista de tarefas", () => {
  // Verifica se a qtd de tarefas anterior continua a mesma
  cy.get("@array_tasks_length").then((length) => {
    cy.request({
      method: "GET",
      url: `${BACKEND_ENDPOINT_TASKS}`,
      headers: { ...HEADERS },
      failOnStatusCode: false,
    }).then((response) => {
      // Compara o length do array antes e depois da tentativa de cadastro
      expect(response.body.length).to.eq(length);
    });
  });
});

// Scenario: Atualizar o texto da tarefa

Given("que acessei uma tarefa", () => {
  cy.visit(`${FRONTEND_URL}`);
  cy.reload(true);

  cy.get(`[data-id="${last_new_task.id}"]`).as("card_selected");
});

When("alterar o texto desta tarefa", () => {
  cy.fixture("tasks/tasks.json").then((tasks) => {
    last_new_task_altered = { ...last_new_task, text: tasks[1].text };
    cy.get("@card_selected").find('textarea[class*="text"]').clear();

    cy.get("@card_selected")
      .find('textarea[class*="text"]')
      .type(last_new_task_altered.text);
  });
});

Then('eu clicar no botão "Salvar" desta tarefa', () => {
  cy.get("@card_selected").find('button[class*="updateCard"]').click();
});

Then("o novo texto deve aparecer nesta tarefa", () => {
  cy.get("@card_selected")
    .get('textarea[class*="text"]')
    .should("have.value", last_new_task_altered.text);
});

Then("o texto da tarefa deve ser atualizado no banco de dados", () => {
  // diferente de last_new_task.text
  // igual a last_new_task_altered.text
  let task_from_db;

  cy.request({
    method: "GET",
    url: `${BACKEND_ENDPOINT_TASKS}/${last_new_task.id}`,
    headers: { ...HEADERS },
    failOnStatusCode: false,
  }).then((response) => {
    task_from_db = response.body;
  });

  // Comparando as informações do cadastro original da tarefa
  cy.wrap(last_new_task).then((task) => {
    expect(task.id).to.eq(task_from_db.id);
    // O texto da tarefa no db NÃO pode ser igual ao do mockup inicial
    expect(task.text).to.not.eq(task_from_db.text);
  });

  // Comparando as informações da tarefa já alterada
  cy.wrap(last_new_task_altered).then((task) => {
    expect(task.id).to.eq(task_from_db.id);
    // O texto da tarefa no db DEVE ser igual ao do mockup secundário
    expect(task.text).to.eq(task_from_db.text);
  });
});

// Scenario: Atualizar o status da tarefa para "concluído"

// Given ('que acessei uma tarefa', () => {})

When("eu clicar no botão de conclusão da tarefa", () => {
  cy.intercept(
    "PUT",
    `${BACKEND_ENDPOINT_TASKS}/${last_new_task_altered.id}`,
  ).as("response_update_status_of_task");

  cy.get("@card_selected").find('button[class*="finish"]').click();

  // cy.get("@card_selected").find('button[class*="finish"]').should("not.be.visible")
});

Then("o novo status deve aparecer nesta tarefa", () => {
  cy.get("@card_selected")
    .find('button[class*="unfinish"]')
    .should("be.visible");
});

Then("o novo status da tarefa deve ser atualizado no banco de dados", () => {
  cy.wait("@response_update_status_of_task").then((interception) => {
    expect(interception.response.statusCode).to.eq(200);

    let task_new_status = interception.request.body.status;
    cy.log("task_new_status: " + task_new_status);
  });
});

// Scenario: Atualizar o status da tarefa para "pendente"

// Given ('que acessei uma tarefa', () => {})

// When ('eu clicar no botão de conclusão da tarefa', () => {})

// Then ('o novo status deve aparecer nesta tarefa', () => {})

// Then ('o novo status da tarefa deve ser atualizado no banco de dados', () => {})

//Scenario: Listar tarefas cadastradas

// Scenario: Deletar uma tarefa existente

// Given ('que acessei uma tarefa', () => {})

When("eu clico no botão de exclusão desta tarefa", () => {
  cy.intercept("DELETE", `${BACKEND_ENDPOINT_TASKS}/${last_new_task.id}`).as(
    "response_delete_task_by_id",
  );

  cy.get("@card_selected").find("button[class*=close]").click();
});

Then("a tarefa não deve aparecer na lista de tarefas", () => {
  cy.get("@card_selected").should("not.exist");
});

Then("a tarefa não deve aparecer no banco de dados", () => {
  cy.wait("@response_delete_task_by_id").then((interception) => {
    expect(interception.response.statusCode).to.eq(200);
  });
});
