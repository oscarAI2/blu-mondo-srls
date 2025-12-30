import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Block, Category } from '../types';

interface SystemLog {
  timestamp: string;
  msg: string;
  type: 'info' | 'success' | 'warn' | 'error';
}

interface NetworkRequest {
  id: string;
  route: string;
  status: string;
  latency: string;
  type: 'AI' | 'SEC' | 'DB' | 'SYS' | 'FN';
  timestamp: string;
}

interface Telemetry {
  cpu: number;
  memory: number;
  tokens: number;
  artifacts: number;
}

interface StudioContextType {
  artifacts: Block[];
  logs: SystemLog[];
  traffic: NetworkRequest[];
  telemetry: Telemetry;
  addArtifact: (block: Block) => void;
  removeArtifact: (id: string) => void;
  moveArtifact: (id: string, direction: 'up' | 'down') => void;
  addLog: (msg: string, type?: SystemLog['type']) => void;
  recordRequest: (route: string, type: NetworkRequest['type'], status?: string) => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artifacts, setArtifacts] = useState<Block[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [traffic, setTraffic] = useState<NetworkRequest[]>([]);
  const [telemetry, setTelemetry] = useState<Telemetry>({
    cpu: 15,
    memory: 42,
    tokens: 0,
    artifacts: 0
  });

  const addLog = useCallback((msg: string, type: SystemLog['type'] = 'info') => {
    const newLog: SystemLog = {
      timestamp: new Date().toLocaleTimeString(),
      msg,
      type
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  }, []);

  const recordRequest = useCallback((route: string, type: NetworkRequest['type'], status = '200 OK') => {
    const latencies = ['12ms', '45ms', '124ms', '210ms', '8ms'];
    const newReq: NetworkRequest = {
      id: Math.random().toString(36).substr(2, 9),
      route,
      status,
      latency: latencies[Math.floor(Math.random() * latencies.length)],
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setTraffic(prev => [newReq, ...prev].slice(0, 20));
  }, []);

  const addArtifact = useCallback((block: Block) => {
    const newId = `${block.id}-${Date.now()}`;
    setArtifacts(prev => [...prev, { ...block, id: newId }]);
    setTelemetry(prev => ({ ...prev, artifacts: prev.artifacts + 1 }));
    addLog(`INTEGRATED_NODE: ${block.name}`, 'success');
    recordRequest('/api/v4/studio/integrate', 'DB');
  }, [addLog, recordRequest]);

  const removeArtifact = useCallback((id: string) => {
    setArtifacts(prev => prev.filter(a => a.id !== id));
    addLog(`TERMINATED_NODE: ${id}`, 'warn');
    recordRequest('/api/v4/studio/terminate', 'SYS');
  }, [addLog, recordRequest]);

  const moveArtifact = useCallback((id: string, direction: 'up' | 'down') => {
    setArtifacts(prev => {
      const idx = prev.findIndex(a => a.id === id);
      if (idx === -1) return prev;
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
      return next;
    });
    addLog(`ORCHESTRATED_NODE: ${id} ${direction}`, 'info');
  }, [addLog]);

  // Global Telemetry Pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 20 + 5),
        memory: Math.floor(Math.random() * 5 + 38)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StudioContext.Provider value={{
      artifacts, logs, traffic, telemetry,
      addArtifact, removeArtifact, moveArtifact, addLog, recordRequest
    }}>
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) throw new Error('useStudio must be used within StudioProvider');
  return context;
};
