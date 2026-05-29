import { users } from "../../data/data";
import type { User } from "../../types/domain.types";

export function findUserById(id: string): User | undefined {
  return users.find((user: User): boolean => user.id === id);
}
