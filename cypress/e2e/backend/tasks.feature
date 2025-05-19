Feature: Gerenciamento de tarefas
  
  @regress @rest
  Scenario: Criar uma nova tarefa com sucesso
    Given que a API está rodando
    When eu envio uma requisição POST com corpo válido
    Then o status da resposta deve ser 201
    Then o corpo da resposta deve conter o "id" da tarefa cadastrada

  @regress @rest
  Scenario: Listar todas as tarefas
    Given que existem tarefas cadastradas
    When eu envio uma requisição GET
    Then o status da resposta para o GET deve ser 200
    Then o corpo da resposta deve conter uma lista de tarefas
    Then cada item da lista deve conter "id" e "text"

  @regress @rest
  Scenario: Deletar uma tarefa existente
    Given que uma tarefa recém criada existe
    When eu envio uma requisição DELETE
    Then o status da resposta para o DELETE deve ser 200
    Then a tarefa recém deletada não deve mais existir

  @regress @rest
  Scenario: Tentar deletar uma tarefa que não existe
    Given que acabei de deletar uma tarefa
    When eu envio uma requisição DELETE com o "id" desta tarefa
    Then o status da resposta deve ser 500
    Then o corpo da resposta deve conter uma mensagem de erro

