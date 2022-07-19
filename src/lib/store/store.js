import { writable } from "svelte/store";

export const selectedIDs = writable([]);
export const studentData = writable([]);
export const nowEditing = writable(null);
export const editingModalOpen = writable(false);
export const addModalOpen = writable(false);
export const editMode = writable(false);
export const filterModalOpen = writable(false);
export const maxRecordPerPage = writable(25);
export const currentPage = writable(1);
export const maxPage = writable(10);
export const baseurl = writable(import.meta.env.VITE_BASEURL);
