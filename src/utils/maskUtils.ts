export function allowOnlyNumbers(event: KeyboardEvent): void {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
  }
}

export function formatZipCode(value: string): string {
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length > 8) {
    return cleanValue.slice(0, 5) + '-' + cleanValue.slice(5, 8);
  }
  
  if (cleanValue.length > 5) {
    return cleanValue.slice(0, 5) + '-' + cleanValue.slice(5);
  }
  
  return cleanValue;
}
