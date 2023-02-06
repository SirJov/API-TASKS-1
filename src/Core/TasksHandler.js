const taskModel = require("../Models/TaskModel");

class TasksHandler {
  constructor() {}

  async gravar(req) {
    try {
      const { value_task } = req.body;
      const params_1 = [value_task];
      const userQuery = `SELECT * FROM tasks WHERE value_task =?`;
      const user = await taskModel(userQuery, params_1);
      if (user.length > 0) throw new Error("Esta tarefa já existe");

      const userConfirm = await taskModel(userQuery, value_task);

      const params_2 = [value_task, "PENDENTE"];
      const query = "INSERT INTO tasks (value_task,state_task) VALUES (?,?)";
      await taskModel(query, params_2);

      return [{ mensagem: "Tarefa criada com sucesso!!!" }, userConfirm[0]];
    } catch (error) {
      return { message: error.message, code: 500 };
    }
  }

  async buscar() {
    try {
      const query = "SELECT * FROM tasks";
      return await taskModel(query);
    } catch (error) {
      return {
        message: "falha ao buscar usuarios no banco de dados",
        code: 500,
      };
    }
  }

  async deletar(req) {
    try {
      const { id } = req.params;
      const params_1 = [id];
      const userQuery = `SELECT * FROM tasks WHERE id_tasks =?`;
      const user = await taskModel(userQuery, params_1);
      if (user.length == 0) throw new Error("Esta tarefa nao existe");

      const params_2 = [id];
      const query = "DELETE FROM tasks WHERE id_tasks =?";
      await taskModel(query, params_2);
      return { mensagem: "Tarefa deletada com sucesso!!!" };
    } catch (error) {
      return { message: error.message, code: 500 };
    }
  }

  async deletarBody(req) {
    try {
      const { value_task } = req.query.value_task;
      console.log(value_task + " AAAAAAAAAAAAAA vvv");
      const userQuery = `SELECT * FROM tasks WHERE value_task =?`;
      const user = await taskModel(userQuery, value_task);
      if (user.length == 0) throw new Error("Esta tarefa nao existe");

      const query = "DELETE FROM tasks WHERE value_task =?";
      await taskModel(query, value_task);
      return { mensagem: "Tarefa deletada com sucesso!!!" };
    } catch (error) {
      return { message: error.message, code: 500 };
    }
  }

  async atualizar(req) {
    try {
      const { id } = req.params;
      const params_1 = [id];
      const userQuery = `SELECT state_task FROM tasks WHERE id_tasks =?`;
      const user = await taskModel(userQuery, params_1);

      //destruindo a json retornada da tarefa especifica e obtendo o status em 'string'
      const [a] = user;
      const { state_task } = a;
      console.log(state_task);

      function estadoCorreto(a) {
        if (a === "PENDENTE") {
          const infEdit = "CONCLUIDO";
          return infEdit;
        }
        if (a === "CONCLUIDO") {
          const infEdit = "PENDENTE";
          return infEdit;
        }
      }

      const estados = estadoCorreto(state_task);

      if (user.length == 0) throw new Error("Esta tarefa nao existe");

      const params_2 = [estados, id];
      const query = "UPDATE tasks SET state_task = ? WHERE id_tasks =?";
      await taskModel(query, params_2);
      return { mensagem: "Estado atualizado com sucesso!!!" };
    } catch (error) {
      return { message: error.message, code: 500 };
    }
  }

  async buscarId(req) {
    try {
      const { id } = req.params;
      const params_1 = [id];
      const userQuery = `SELECT * FROM tasks WHERE id_tasks =?`;
      const user = await taskModel(userQuery, params_1);
      if (user.length == 0)
        return { mensagem: "Esta tarefa nao existe", code: 500 };

      return user;
    } catch (error) {
      return {
        message: "falha ao buscar usuarios no banco de dados",
        code: 500,
      };
    }
  }

  async buscarBody(req) {
    try {
      const { value_task } = req.body;
      const params_1 = [value_task];
      const userQuery = `SELECT * FROM tasks WHERE value_task =?`;
      const user = await taskModel(userQuery, params_1);
      if (user.length == 0)
        return { mensagem: "Esta tarefa nao existe", code: 500 };

      return user;
    } catch (error) {
      return {
        message: "falha ao buscar usuarios no banco de dados",
        code: 500,
      };
    }
  }
}

module.exports = TasksHandler;
