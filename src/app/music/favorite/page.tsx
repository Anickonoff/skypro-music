'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { accessToken, authInitialized } = useAppSelector(
    (state) => state.auth,
  );
  const router = useRouter();
  useEffect(() => {
    if (!accessToken && authInitialized) {
      router.push('/music/main');
    }
  }, [accessToken, authInitialized]);
  return <Centerblock />;
}
