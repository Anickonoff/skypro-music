'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { selectAuthStatus } from '@/store/features/authSelectors';
import { useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const authStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    if (authStatus === 'unauthorized') {
      router.replace('/music/main');
    }
  }, [authStatus, router]);
  return <Centerblock />;
}
