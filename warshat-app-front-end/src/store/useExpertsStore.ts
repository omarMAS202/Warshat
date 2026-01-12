import { create } from "zustand";
import api from "@/lib/api";

export interface ExpertProfile {
    id: number;
    user_id: number;
    service_id: number;
    bio: string | null;
    description: string | null;
    major: string | null;
    rating: number;
    hourly_rate: number;
    experience_years: number;
    availability: string;
    is_active: boolean;
}

export interface Expert {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    location: string | null;
    avatar: string | null;
    expert_profile: ExpertProfile | null;
}

interface ServiceInfo {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | null;
}

interface ExpertsStore {
    experts: Expert[];
    service: ServiceInfo | null;
    loading: boolean;
    error: string | null;
    fetchServiceWithExperts: (serviceId: number) => Promise<void>;
}

export const useExpertsStore = create<ExpertsStore>((set) => ({
    experts: [],
    service: null,
    loading: false,
    error: null,
    fetchServiceWithExperts: async (serviceId: number) => {
        set({ loading: true, error: null, experts: [], service: null });
        try {
            const { data } = await api.get(`/services/${serviceId}`);
            // The backend returns { service_info: ..., experts: ... }
            set({
                experts: data.experts,
                service: data.service_info,
                loading: false
            });
        } catch (error) {
            console.error("Failed to fetch service experts:", error);
            set({
                error: "فشل في تحميل بيانات الخدمة والفنيين",
                loading: false,
            });
        }
    },
}));
