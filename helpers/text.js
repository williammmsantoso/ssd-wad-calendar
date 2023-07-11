export const getFormatTime = (date) => {
    if (date) {
        let d = new Date(date);

        const h = (d.getHours()<10?'0':'') + d.getHours(), m = (d.getMinutes()<10?'0':'') + d.getMinutes();

        return h + ':' + m;
    }

    return ''
    
}