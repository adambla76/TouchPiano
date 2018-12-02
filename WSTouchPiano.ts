/*****************************************************************************
* | File      	:	WSTouchPiano
* | Author      :   Waveshare team
* | Function    :	Contorl Piano  
* | Info        :
*----------------
* |	This version:   V1.1
* | Date        :   2018-05-22
* | Info        :   Improve misidentification
*
* | Basic       :   2018-01-22
* | Info        :   Basic version
******************************************************************************/
/**
 * The piano key corresponds to the touch screen TPvalue.
 */
enum TP_PIANO {
    None = 0x0000,
    C = 0x0001,
    bD = 0x0002,
    D = 0x0004,
    bE = 0x0008,

    E = 0x0010,
    F = 0x0020,
    bG = 0x0040,
    G = 0x0080,

    bA = 0x0100,
    A = 0x0200,
    bB = 0x0400,
    B = 0x0800,

    C1 = 0x1000
}


/**
 * Operate the function of the piano board.
 */
//% weight=20 color=#3333FF icon="\uf001"
namespace WSTouchPiano {
    //% blockId=tp_press 
    //% block="Pey|%index|is pressed"
    //% weight=100
    export function TP_Press(index: TP_PIANO): boolean {
        let TPval = pins.i2cReadNumber(0x57, NumberFormat.UInt16BE);

        let keyup = 1;
        let press = false;
        if (keyup && TPval != TP_PIANO.None) {
            if (TPval != TP_PIANO.None) {
                keyup = 0;
                let temp = TPval >> 8;
                TPval = (TPval << 8) | temp;
                if (index != 0) {
                    if (TPval & index) {
                        press = true;
                    } else {
                        press = false;
                    }
                } else {
                    if (TPval == 0) {
                        press = true;
                    } else {
                        press = false;
                    }
                }
            }
        }
        return press;
    }

}
