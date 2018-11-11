interface IRgb {
  r: number
  g: number
  b: number
}

export const hexToRgb = (hex : string): IRgb => {
  function fixLength () {
    if (hex.length === 6) return hex;
    
    function multiply(str: string) : string {
      if (str === '') return '';
      
      const firstLetter = str.substr(0, 1);
      return firstLetter + firstLetter + multiply(str.substr(1));
    }
    
    return multiply(hex)
  }
  
  
  function convert(input : string) : number {
    return parseInt(input, 16);
  }
  
  return {
    r: convert(fixLength().substr(0, 2)),
    g: convert(fixLength().substr(2, 2)),
    b: convert(fixLength().substr(4, 2))
  };
};

export const rgbToHex = (r: number, g: number, b: number) : string => {
  function convert(num: number) : string {
    if (num < 0) num = 0;
    if (num > 255) num = 255;
    
    const parseNum = num.toString();
    const str = parseInt(parseNum, 10).toString(16);
    return str.length < 2 ? str + str : str;
  }
  
  return `${convert(r)}${convert(g)}${convert(b)}`
};
