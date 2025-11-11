'use client';

import { useAuth as useFirebaseAuth } from '@/lib/firebase/client-provider';

export const useAuth = () => {
    return useFirebaseAuth();
};
