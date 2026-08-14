import { useState, useEffect, useRef } from 'react';
import CulqiService from '../services/culqiService';

export const useCulqiCheckout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const activeInstanceRef = useRef<any>(null);

  useEffect(() => {
    CulqiService.loadScript()
      .then(() => setIsLoaded(true))
      .catch((err) => console.error('Failed to load Culqi script:', err));
  }, []);

  // Listen to postMessage from Culqi iframe to detect closure or events
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin && event.origin.includes('culqi')) {
        console.log('Received postMessage from Culqi:', event.data);
        if (event.data === 'checkout_cerrado' || (event.data && event.data.action === 'close')) {
          setIsProcessing(false);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Poll DOM to see if culqi checkout iframe is open/closed (defensive backup)
  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      const culqiContainer = document.querySelector('iframe[src*="culqi.com"]') || document.getElementById('culqi-container');
      if (!culqiContainer) {
        setIsProcessing(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isProcessing]);

  const openCulqi = (
    total: number,
    email: string,
    onSuccess: (token: string) => void,
    onError: (errorMsg: string) => void
  ) => {
    setIsProcessing(true);
    try {
      const instance = CulqiService.openCheckout(
        total,
        email,
        (token) => {
          setIsProcessing(false);
          onSuccess(token);
        },
        (error) => {
          setIsProcessing(false);
          onError(error);
        }
      );
      activeInstanceRef.current = instance;
    } catch (err) {
      setIsProcessing(false);
      throw err;
    }
  };

  return {
    isLoaded,
    isProcessing,
    openCulqi,
  };
};

export default useCulqiCheckout;
