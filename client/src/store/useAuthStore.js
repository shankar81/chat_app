import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isRegister: false,
  isLogin: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.log("Error in checking auth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async () => {},
}));
