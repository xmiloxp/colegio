import { apiPost } from "../../api";

export const openCashbox = (values) => {
  return apiPost('/opencashbox', values)();
}