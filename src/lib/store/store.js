import { writable } from "svelte/store";

export const selectedIDs = writable([]);
export const studentData = writable([]);
export const nowEditing = writable(null);
export const editingModalOpen = writable(false);
export const addModalOpen = writable(false);
export const editMode = writable(false);
export const page = writable(0);
export const filterModalOpen = writable(false);
