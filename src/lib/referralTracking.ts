const STORAGE_KEY = "rp_ref";
const EXPIRY_DAYS = 30;

interface ReferralData {
  affiliateId: string;
  capturedAt: number;
}

/**
 * Captures the `ref` query parameter and stores it in localStorage with a 30-day expiry.
 * Call this on any page that should capture referral attribution.
 */
export function captureReferral(): void {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  if (ref && ref.trim().length > 0) {
    const data: ReferralData = {
      affiliateId: ref.trim(),
      capturedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

/**
 * Returns the stored affiliate ID if it exists and hasn't expired.
 */
export function getReferralAffiliateId(): string | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const data: ReferralData = JSON.parse(raw);
    const expiryMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    if (Date.now() - data.capturedAt > expiryMs) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data.affiliateId;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

/**
 * Clears stored referral data (e.g., after successful attribution).
 */
export function clearReferral(): void {
  localStorage.removeItem(STORAGE_KEY);
}
