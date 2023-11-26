import { create } from "zustand";

interface ActiveListStore {
    members: string[];
    // eslint-disable-next-line no-unused-vars
    add: (id: string) => void;
    // eslint-disable-next-line no-unused-vars
    remove: (id: string) => void;
    // eslint-disable-next-line no-unused-vars
    set: (ids: string[]) => void;
}

const useActiveUsers = create<ActiveListStore>((set) => ({
    members: [],
    add: (id) => set((state) => ({ members: [...state.members, id] })),
    remove: (id) => set((state) => ({ members: state.members.filter((memberId) => memberId !== id) })),
    set: (ids) => set({ members: ids })
}));

export default useActiveUsers;