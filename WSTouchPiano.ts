
/**
 * The piano key corresponds to the touch screen TPvalue.
 */
enum TP_PIANO {
    None = 0x0000,
    C = 0x0001,
    "C#" = 0x0002,
    D = 0x0004,
    "D#" = 0x0008,

    E = 0x0010,
    F = 0x0020,
    "F#" = 0x0040,
    G = 0x0080,

    "G#" = 0x0100,
    A = 0x0200,
    "A#" = 0x0400,
    B = 0x0800,

    C1 = 0x1000
}

const TPKeyPressedEventID = 3103;

/**
 * Operate the function of the piano board.
 */
//% weight=20 color=#3333FF icon="\uf001"
namespace MiniPiano {
    //% blockId=tp_press 
    //% block="Key|%index|is pressed"
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


    /**
    * Do something when a key is Piano Key detected 
    */
    //% blockId=onKeyPressed_create_event block="on Piano Key Pressed"
    export function onKeyPressed(handler: () => void) {
        control.onEvent(TPKeyPressedEventID, 0, handler);
        control.inBackground(() => {
            while (true) {
                control.raiseEvent(TPKeyPressedEventID, 0);
                basic.pause(50);
            }

        })

    }

}
