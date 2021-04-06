import model from "../models";
const { Workspace } = model;

const getAllWorkspace = async (request, response, next) => {
  //Retrieve all workspaces
  try {
    let workspaceList = await Workspace.findAll({
      attributes: { exclude: ["UserId"] },
    });
    response.status(200).send(workspaceList);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: error.message,
    });
    next(error);
  }
};

const createWorkspace = async (request, response, next) => {
  //create a new workspaces
  try {
    if (request.body === "" || request.body == null) {
      response.status(400).json({
        message: "Request body required",
      });
    } else {
      let workspacesRetrieved = await Workspace.create(request.body);
      response.status(201).send(workspacesRetrieved);
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: error.message,
    });
    next(error);
  }
};

const getWorkspaceById = async (request, response, next) => {
  //Retrieve one workspaces by id
  try {
    const id = request.params.id;
    let workspacesRetrieved = await Workspace.findByPk(id, {
      attributes: { exclude: ["UserId"] },
    });
    if (workspacesRetrieved == null) {
      response.status(404).json({
        message: `Workspace id ${id} not found`,
      });
      next(`Workspace id ${id} not found`);
    } else {
      request.workspaces = workspacesRetrieved;
      next();
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: error.message,
    });
    next(error);
  }
};

const updateWorkspaceById = async (request, response, next) => {
  //Update one workspaces by id
  try {
    const workspacesId = request.params.id;
    let workspacesRetrieved = await Workspace.update(request.body, {
      where: { id: workspacesId },
    });
    if (workspacesRetrieved == 1) {
      response.status(202).json({
        message: "Workspace updated",
      });
    } else {
      response.status(400).json({
        message: "Workspace NOT updated",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: error,
    });
    next(error);
  }
};

const deleteWorspaceById = async (request, response, next) => {
  //Delete one workspaces by id
  try {
    const workspacesId = request.params.id;
    let workspacesRetrieved = await Workspace.destroy({
      where: { id: workspacesId },
    });
    if (workspacesRetrieved == 1) {
      response.status(204).send();
    } else {
      response.status(400).json({
        message: "Worspace NOT deleted",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: error,
    });
    next(error);
  }
};

export {
  getAllWorkspace,
  createWorkspace,
  getWorkspaceById,
  updateWorkspaceById,
  deleteWorspaceById,
};
