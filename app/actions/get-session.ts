import { getServerSession } from "next-auth";
import { authOptions } from "../constant/auth-options";

export default async function getSession() {
  return await getServerSession(authOptions);
}
