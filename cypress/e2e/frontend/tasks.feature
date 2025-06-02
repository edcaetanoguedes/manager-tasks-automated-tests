Feature: Gerenciamento de tarefas

    @regress @frontend @integration
    Scenario: Criar uma nova tarefa com sucesso
        Given que estou na página de tarefas
        When eu preencher o campo texto para a nova tarefa
        Then eu clicar no botão "Adicionar" tarefa
        Then a tarefa deve aparecer na lista de tarefas
        Then a tarefa deve aparecer no banco de dados

    @regress @frontend @integration
    Scenario: Tentar criar uma tarefa vazia
        Given que estou na página de tarefas
        When eu preencher o campo texto com um valor inválido para a nova tarefa
        Then eu clicar no botão "Adicionar"
        Then nenhuma tarefa nova deve aparecer na lista de tarefas

    @regress @frontend @integration
    Scenario: Atualizar o texto da tarefa
        Given que acessei uma tarefa
        When alterar o texto desta tarefa
        Then eu clicar no botão "Salvar" desta tarefa
        Then o novo texto deve aparecer nesta tarefa
        Then o texto da tarefa deve ser atualizado no banco de dados

    @regress @frontend @integration
    Scenario: Atualizar o status da tarefa para "concluído"
        Given que acessei uma tarefa
        When eu clicar no botão de conclusão da tarefa
        Then o novo status deve aparecer nesta tarefa
        Then o novo status da tarefa deve ser atualizado no banco de dados

    @regress @frontend @integration
    Scenario: Atualizar o status da tarefa para "pendente"
        Given que acessei uma tarefa
        When eu clicar no botão de conclusão da tarefa
        Then o novo status deve aparecer nesta tarefa
        Then o novo status da tarefa deve ser atualizado no banco de dados

    @regress @frontend @integration
    Scenario: Deletar uma tarefa existente
        Given que acessei uma tarefa
        When eu clico no botão de exclusão desta tarefa
        Then a tarefa não deve aparecer na lista de tarefas
        Then a tarefa não deve aparecer no banco de dados