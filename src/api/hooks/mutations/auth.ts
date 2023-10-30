import { LOGIN_MUTATION_KEY, LOGOUT_MUTATION_KEY, REGISTER_MUTATION_KEY } from "@/api/constants/keys";
import { login, logout, register } from "@/api/services/authService";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({ mutationKey: [LOGIN_MUTATION_KEY], mutationFn: login });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: [REGISTER_MUTATION_KEY],
    mutationFn: register,
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationKey: [LOGOUT_MUTATION_KEY],
    mutationFn: logout,
  });
};
