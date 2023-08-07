export function validateDecimal(num: string, decimal: number): boolean {
  // redondear el número a dos decimales
  var numRedondeado = parseFloat(num).toFixed(decimal);
  
  // comparar el número original con el redondeado
  if (numRedondeado === num) {
    return true;
  } else {
    return false;
  }
}