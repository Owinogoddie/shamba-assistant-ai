
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FarmData } from './lib/types';

const DynamicFarmForm = dynamic(
  () => import('./_components/farm-form').then((mod) => mod.FarmForm),
  { ssr: false }
);

interface ClientSideFarmFormProps {
  onSubmit: (farmData: FarmData) => void;
}

const ClientSideFarmForm: React.FC<ClientSideFarmFormProps> = ({ onSubmit }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading form...</div>;
  }

  return <DynamicFarmForm onSubmit={onSubmit} />;
};

export default ClientSideFarmForm;