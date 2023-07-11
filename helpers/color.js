export const getRandomColor = () => {
    const res = Math.floor(Math.random()*16777215).toString(16);
    
    if (res && res !== 'FFFFFF') {
        return res ;
    } else {
        return '000';
    }
}