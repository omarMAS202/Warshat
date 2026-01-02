import { create } from "zustand";
import api from "@/lib/api";

export interface Section {
    id: number;
    name: string;
    description: string;
    image: string | null;
}

export interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | null;
    section_id: number;
}

interface ServicesStore {
    sections: Section[];
    currentSection: Section | null; // Added to store current section details
    currentSectionServices: Service[];
    loading: boolean;
    error: string | null;
    fetchSections: () => Promise<void>;
    fetchServicesBySection: (sectionId: number) => Promise<void>;
    clearCurrentServices: () => void;
}

export const useServicesStore = create<ServicesStore>((set, get) => ({
    sections: [],
    currentSection: null, // Initialize currentSection
    currentSectionServices: [],
    loading: false,
    error: null,
    fetchSections: async () => {
        if (get().sections.length > 0 || get().loading) return;

        set({ loading: true, error: null });
        try {
            const { data } = await api.get("/sections");
            set({ sections: data, loading: false });
        } catch (error) {
            console.error("Failed to fetch sections:", error);
            set({
                error: "فشل في تحميل الأقسام",
                loading: false
            });
        }
    },
    fetchServicesBySection: async (sectionId: number) => {
        set({ loading: true, error: null, currentSectionServices: [], currentSection: null });
        try {
            const { data } = await api.get(`/sections/${sectionId}`);

            // Extract services
            const services = Array.isArray(data) ? data : (data.services || []);
            
            // Extract section details (assuming data contains section info along with services)
            // If the endpoint returns the section object directly:
            const sectionInfo: Section = {
                id: data.id,
                name: data.name,
                description: data.description,
                image: data.image
            };

            set({ 
                currentSectionServices: services, 
                currentSection: sectionInfo, // Update current section
                loading: false 
            });
        } catch (error) {
            console.error(`Failed to fetch services for section ${sectionId}:`, error);
            set({
                error: "فشل في تحميل الخدمات لهذا القسم",
                loading: false
            });
        }
    },
    clearCurrentServices: () => set({ currentSectionServices: [], currentSection: null }),
}));
