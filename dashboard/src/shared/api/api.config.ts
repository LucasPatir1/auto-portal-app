import { environment } from "src/environments/environment";

export const BASE_URL = `${environment.baseURL}/api`;

export const loginUrl = BASE_URL + '/admin/login'