export function joinUrl(params: string[], opts: string = "", populate: boolean = true): string {
    let master: string = import.meta.env.VITE_CMS_URL;
    if (params && params.length > 0) {
        params.forEach(param => {
            master += param[0] === '/' ? `${encodeURIComponent(param)}` : `/${encodeURIComponent(param)}`;
        });
    }
    master += opts;
    return master + (populate ? master.indexOf('?') !== -1 ? "&populate=*" : "?populate=*" : "");
}