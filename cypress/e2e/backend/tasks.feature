Feature: Gerenciamento de tarefas
  
  @regress @backend @rest
  Scenario: Listar opções de status as tarefa
    Given que existem opções de status de tarefa cadastradas
    When eu envio uma requisição para obter todas as opções de status de tarefas
    Then o corpo da resposta deve conter uma lista de opções de status
    Then ao retornar todas as opções o status da resposta deve ser 200
    Then cada opção de status retornado deve conter "id" e "title"

  @regress @backend @rest
  Scenario: Consultar uma opção de status de tarefa pelo ID
    Given que a opção de status da tarefa existe
    When eu envio a requisição para obter detalhes da opção de status
    Then ao retornar os detalhes da opção de status recebo o código 200
    Then o corpo da opção deve conter "id", "title"

  @regress @backend @rest @negative
  Scenario: Consultar uma opção de status de tarefa inexistente pelo ID
    Given que a opção de status da tarefa não existe
    When eu envio a requisição para obter detalhes da opção de status
    Then ao retornar os detalhes da opção de status recebo o código 400

  @regress @backend @rest
  Scenario: Criar uma nova tarefa com sucesso
    Given que a API está rodando
    When eu envio uma requisição POST com corpo válido
    Then o status da resposta deve ser 201
    Then o corpo da resposta deve conter o "id" da tarefa cadastrada

  @regress @backend @rest
  Scenario: Consultar tarefa pelo ID
    Given que a tarefa a ser pesquisada exista
    When eu envio uma requisição para obter detalhes da tarefa
    Then ao retornar os detalhes da tarefa recebo o código 200
    Then o corpo da tarefa deve conter "id", "text", "status", "data de criação"

  @regress @backend @rest
  Scenario: Atualizar status de uma tarefa
    Given que a tarefa a ser atualizada exista
    When eu envio uma requisição para atualizar o status da tarefa para "concluído"
    Then ao atualizar status da tarefa recebo o código 200
    Then ao atualizar o status da tarefa o corpo da resposta deve conter uma mensagem de sucesso

  @regress @backend @rest
  Scenario: Atualizar texto de uma tarefa
    Given que a tarefa a ser atualizada exista
    When eu envio uma requisição para atualizar o texto da tarefa
    Then ao atualizar texto da tarefa recebo o código 200
    Then o corpo da resposta deve conter uma mensagem de sucesso

  @regress @backend @rest @negative
  Scenario: Tentar atualizar uma tarefa com um status que não existe
    Given que a tarefa a ser atualizada exista
    When eu envio uma requisição para atualizar o status da tarefa para "no_exist"
    Then ao tentar atualizar com o status inexistente recebo o código 400
    Then o corpo da resposta deve conter uma mensagem de erro

  @regress @backend @rest
  Scenario: Listar todas as tarefas
    Given que existem tarefas cadastradas
    When eu envio uma requisição para obter todas as tarefas
    Then o status da resposta para o GET deve ser 200
    Then o corpo da resposta deve conter uma lista de tarefas
    Then cada tarefa retornada deve conter "id", "text", "status", "creation"

  @regress @backend @rest
  Scenario: Deletar uma tarefa existente
    Given que uma tarefa recém criada existe
    When eu envio uma requisição DELETE
    Then o status da resposta para o DELETE deve ser 200

  @regress @backend @rest @negative
  Scenario: Consultar tarefa inexistente pelo ID
    Given que a tarefa a ser pesquisada não exista
    When eu envio uma requisição para obter detalhes da tarefa
    Then ao não retornar os detalhes da tarefa inexistente recebo o código 400
    Then o corpo da tarefa não deve conter "id", "text", "status", "data de criação"

  @regress @backend @rest @negative
  Scenario: Atualizar status de uma tarefa inexistente
    Given que a tarefa a ser atualizada não exista
    When eu envio uma requisição para atualizar o status da tarefa para "concluído"
    Then ao tentar atualizar status da tarefa recebo o código 400

  @regress @backend @rest @negative
  Scenario: Atualizar texto de uma tarefa inexistente
    Given que a tarefa a ser atualizada não exista
    When eu envio uma requisição para atualizar o texto da tarefa
    Then ao tentar atualizar texto da tarefa recebo o código 400

  @regress @backend @rest @negative
  Scenario: Tentar deletar uma tarefa que não existe
    Given que acabei de deletar uma tarefa
    When eu envio uma requisição DELETE com o "id" desta tarefa
    Then o status da resposta deve ser 400
    Then o corpo da resposta deve conter uma mensagem de erro

