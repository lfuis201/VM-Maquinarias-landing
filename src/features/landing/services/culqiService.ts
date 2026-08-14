import type { CulqiConfig } from '../types/culqi';

export const CULQI_PAYMENT_METHODS = {
  tarjeta: true,
  yape: true,
  billetera: true,
  bancaMovil: true,
  agente: true,
  cuotealo: true,
};

export const getCulqiAppearance = (total: number) => ({
  theme: 'default',
  hiddenCulqiLogo: false,
  hiddenBannerContent: false,
  hiddenBanner: false,
  hiddenToolBarAmount: false,
  menuType: 'sidebar',
  buttonCardPayText: `Pagar S/ ${total.toFixed(2)}`,
  defaultStyle: {
    bannerColor: '#0f172a',
    buttonBackground: '#a3e635',
    menuColor: '#1e293b',
    linksColor: '#a3e635',
    buttonTextColor: '#0f172a',
    priceColor: '#0f172a',
  },
});

export const CulqiService = {
  loadScript: (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const scriptId = 'culqi-checkout-script';
      const targetSrc = 'https://js.culqi.com/checkout-js';
      let script = document.getElementById(scriptId) as HTMLScriptElement;

      if (script && script.src !== targetSrc) {
        script.remove();
        script = null;
      }

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = targetSrc;
        script.async = true;
        script.onload = () => {
          let attempts = 0;
          const interval = setInterval(() => {
            attempts++;
            if ((window as any).CulqiCheckout) {
              clearInterval(interval);
              resolve();
            } else if (attempts > 50) {
              clearInterval(interval);
              reject(new Error('CulqiCheckout SDK loaded but not found on window.'));
            }
          }, 100);
        };
        script.onerror = () => {
          reject(new Error('Error de red al cargar el script de Culqi.'));
        };
        document.body.appendChild(script);
      } else {
        if ((window as any).CulqiCheckout) {
          resolve();
        } else {
          let attempts = 0;
          const interval = setInterval(() => {
            attempts++;
            if ((window as any).CulqiCheckout) {
              clearInterval(interval);
              resolve();
            } else if (attempts > 50) {
              clearInterval(interval);
              reject(new Error('CulqiCheckout not found on window.'));
            }
          }, 100);
        }
      }
    });
  },

  openCheckout: (
    total: number,
    email: string,
    onSuccess: (token: string) => void,
    onError: (errorMsg: string) => void
  ) => {
    const CulqiCheckout = (window as any).CulqiCheckout;
    if (!CulqiCheckout) {
      throw new Error('CulqiCheckout SDK is not loaded.');
    }

    const settings: any = {
      title: 'Sistematízate Store',
      currency: 'PEN',
      amount: Math.round(total * 100),
    };

    if (import.meta.env.VITE_CULQI_RSA_ID) {
      settings.xculqirsaid = import.meta.env.VITE_CULQI_RSA_ID;
    }
    if (import.meta.env.VITE_CULQI_RSA_PUBLIC_KEY) {
      settings.rsapublickey = import.meta.env.VITE_CULQI_RSA_PUBLIC_KEY;
    }

    const client = { email };

    const options = {
      lang: 'es',
      installments: true,
      modal: true,
      paymentMethods: CULQI_PAYMENT_METHODS,
      paymentMethodsSort: Object.keys(CULQI_PAYMENT_METHODS),
    };

    const config: CulqiConfig = {
      settings,
      client,
      options,
      appearance: getCulqiAppearance(total),
    };

    const publicKey = import.meta.env.VITE_CULQI_PUBLIC_KEY || 'pk_test_54ad4519965d5df2';
    const instance = new CulqiCheckout(publicKey, config);

    instance.culqi = () => {
      if (instance.token) {
        console.log('Culqi Token generated:', instance.token);
        try {
          instance.close();
        } catch (e) {
          console.error('Error closing Culqi:', e);
        }
        onSuccess(instance.token.id);
      } else if (instance.order) {
        console.log('Culqi Order generated:', instance.order);
      } else {
        console.error('Culqi Error:', instance.error);
        const userMessage = instance.error ? (instance.error.user_message || instance.error.message) : 'Error del procesador';
        onError(userMessage);
      }
    };

    instance.open();
    return instance;
  }
};

export default CulqiService;
