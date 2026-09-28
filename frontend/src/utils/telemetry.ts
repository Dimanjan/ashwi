/**
 * Ashwi Furniture - Privacy-Preserving Client Telemetry
 * 
 * Tracks visitor engagement, popular products, and conversions without
 * third-party cookies or exposing backend server IPs.
 */

// Generate or retrieve anonymous session ID (stored only for the browser session)
const getSessionId = (): string => {
  if (typeof window === 'undefined') return 'server';
  try {
    let sid = sessionStorage.getItem('ashwi_sid');
    if (!sid) {
      sid = 's_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      sessionStorage.setItem('ashwi_sid', sid);
    }
    return sid;
  } catch {
    return 'anon';
  }
};

// Detect device category
const getDeviceType = (): string => {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|android|ipod|blackberry|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
};

// Dispatch telemetry payload via sendBeacon or keepalive fetch
const sendTelemetry = (payload: {
  event_type: string;
  path: string;
  metadata?: Record<string, any>;
}): void => {
  if (typeof window === 'undefined') return;

  const data = {
    session_id: getSessionId(),
    event_type: payload.event_type,
    path: payload.path || window.location.pathname,
    referrer: document.referrer || '',
    device_type: getDeviceType(),
    screen_size: `${window.screen.width}x${window.screen.height}`,
    metadata: payload.metadata || {},
  };

  try {
    const jsonStr = JSON.stringify(data);
    // Relative endpoint - Proxied by Vercel/Nginx so backend server IP is never exposed!
    const endpoint = '/api/telemetry/';

    if (navigator.sendBeacon) {
      const blob = new Blob([jsonStr], { type: 'application/json' });
      navigator.sendBeacon(endpoint, blob);
    } else {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonStr,
        keepalive: true,
      }).catch(() => {
        // Silently fail if offline
      });
    }
  } catch {
    // Non-blocking fail-safe
  }
};

/**
 * Track a page view event
 */
export const trackPageView = (path?: string, metadata?: Record<string, any>): void => {
  sendTelemetry({
    event_type: 'page_view',
    path: path || window.location.pathname,
    metadata: {
      title: document.title,
      ...metadata,
    },
  });
};

/**
 * Track user interaction events (WhatsApp click, phone call, product view, search)
 */
export const trackEvent = (eventType: string, metadata?: Record<string, any>): void => {
  sendTelemetry({
    event_type: eventType,
    path: window.location.pathname,
    metadata,
  });
};

/**
 * Helper to track product detail views
 */
export const trackProductView = (product: { name: string; slug: string; price: string | number }): void => {
  trackEvent('product_view', {
    product_name: product.name,
    product_slug: product.slug,
    price: product.price,
  });
};
