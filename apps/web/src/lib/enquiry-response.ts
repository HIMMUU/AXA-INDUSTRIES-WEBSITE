export function isSuccessfulEnquiryResponse(response: unknown): boolean {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    response.success === true
  );
}
