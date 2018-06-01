export const randomIntFromInterval = (min,max) =>{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const colorsCollection = () =>{
    return [
        'red',
        'green',
        'blue',
        'yellow',
        'purple',
        'orange',
        'magenta',
        'cyan',
        'brown',
        'indigo'
    ]
}