// Clean and normalize Sri Lankan phone numbers: e.g. "+94 71 059 5548" -> "0710595548"
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("94") && digits.length === 11) {
    return "0" + digits.slice(2);
  }
  return digits;
}
