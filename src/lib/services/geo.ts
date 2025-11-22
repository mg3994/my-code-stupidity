export interface GeoData {
    country_code: string;
    country_name: string;
    currency: string;
    city: string;
}

export async function fetchUserLocation(): Promise<GeoData | null> {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            console.warn('Geolocation API failed:', response.status);
            return null;
        }

        const data = await response.json();

        // Validate that we got valid data
        if (!data || typeof data !== 'object' || !data.country_code) {
            console.warn('Invalid geolocation data received');
            return null;
        }

        return {
            country_code: data.country_code || '',
            country_name: data.country_name || '',
            currency: data.currency || 'USD',
            city: data.city || ''
        };
    } catch (error) {
        console.error('Error fetching location:', error);
        return null;
    }
}
