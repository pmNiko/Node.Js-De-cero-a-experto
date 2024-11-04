import request from "supertest";
import { testServer } from "../../test-server";

const BASE_PATH = "/api/todos";

const app = testServer.app;

export const requestGET = (todoId?: string | number) => {
  const endpoint = todoId ? BASE_PATH + "/" + todoId : BASE_PATH;
  return request(app).get(endpoint);
};

export const requestPOST = () => request(app).post(BASE_PATH);

export const requestPUT = (todoId: string | number) =>
  request(app).put(BASE_PATH + "/" + todoId);

export const requestDELETE = (todoId: string | number) =>
  request(app).delete(BASE_PATH + "/" + todoId);
