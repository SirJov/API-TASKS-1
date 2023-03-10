const validateBody = (req, res, next) => {
  const taskBody = req.body;
  const task = taskBody.value_task;
  const a = task.replace(/\s/g, "");

  if (task === undefined) {
    return res.status(404).json({ mensage: "campo tarefa obrigatorio!!" });
  }

  if (a == "") {
    return res.status(404).json({ mensage: "campo tarefa obrigatorio!!" });
  }

  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;

  const idLink = parseInt(id);

  if (!idLink) {
    return res.status(404).json({ mensage: "Insira um ID valido!!" });
  }

  next();
};

const Valid_cpf = (req, res, next) => {
  const { cpf } = req.body;

  if (!isNaN(cpf)) {
    if (cpf.length !== 11) {
      return res.status(404).json({ mensage: "cpf invalido!! " });
    } else {
      next();
    }
  } else {
    return res.status(404).json({ mensage: "cpf nao pode conter letras!! " });
  }
};

module.exports = {
  validateBody, //Verifica se existe conteudo no body da req
  validateId, //Verifica se o id passado no parametro é valido de tipo valido
  Valid_cpf, //Valida os caracteres do cpf enviado pelo body
};
