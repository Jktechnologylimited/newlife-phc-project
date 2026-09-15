/** Builds a WhatsApp click-to-chat link. `number` is digits-only with
 * country code, no "+" or spaces (e.g. "2348031234567"). */
export function whatsappLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
