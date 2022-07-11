import { writable } from "svelte/store";

export const selectedIDs = writable([]);
export const studentData = writable([]);
export const nowEditing = writable(null);
export const editingModalOpen = writable(false);
export const viewOnly = writable(false);
