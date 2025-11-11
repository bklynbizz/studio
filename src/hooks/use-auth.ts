'use client';

import { useUser } from '@/firebase/provider';

export const useAuth = () => {
    return useUser();
};
