export function joinUrl(params: string[]): string {
    let master: string = import.meta.env.VITE_CMS_URL;
    if (params && params.length > 0) {
        params.forEach(param => {
            master += `/${encodeURIComponent(param)}`;
        });
    }
    return master;
}