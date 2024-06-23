const HEX_BASE_NUMBER = parseInt('ffffff', 16) // ffffff means white color hex to convert integer value. just for a maintain hex code order

export default function generateColor() {
    return `#${Math.floor(Math.random() * HEX_BASE_NUMBER).toString(16)}` // use this HEX_BASE_NUMBER Size make a random Hexadecimal Number with of color code. 
}