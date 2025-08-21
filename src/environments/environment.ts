// Configuración dinámica de API URL
function getApiUrl(): string {
  if (typeof window === 'undefined') {
    return 'http://localhost/plantillaMVC'; // Fallback para SSR
  }
  
  const hostname = window.location.hostname;
  
  // Configuraciones específicas por hostname
  const configurations: { [key: string]: string } = {
    'localhost': 'http://localhost/plantillaMVC',
    '127.0.0.1': 'http://127.0.0.1/plantillaMVC',
    '10.5.3.172': 'http://10.5.3.172/plantillaMVC',
    // Agregar más configuraciones según necesites
  };
  
  // Si hay una configuración específica, usarla
  if (configurations[hostname]) {
    return configurations[hostname];
  }
  
  // Por defecto, usar el hostname actual
  return `http://${hostname}/plantillaMVC`;
}

export const environment = {
  production: false,
  apiUrl: getApiUrl()
};
