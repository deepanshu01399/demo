const getDashValues = (value:string) => {
    if(value===undefined && value==null) value='';
    value=value?.toString()?.split("-")?.join("");
    let x = value.substring(0,3);
    let y= value.substring(3,6);
    let z= value.substring(6,9);
    let dashvalues1 = `${x}${y?.length>0? "-":""}${y}${z?.length>0? "-":""}${z}`
    console.log(x,y,z,dashvalues1)

    return dashvalues1;

}

//add commas with max and min decimal points
export const getMaskedCurrencyValue = (value:number, currencySymbol:string) => {
    let maximumFractionDigits = 2,
      minimumFractionDigits = 2;
  
    if (currencySymbol == 'USD') {
      maximumFractionDigits = 4;
      minimumFractionDigits = 4;
    }
    let text = new Intl.NumberFormat('en-US', {
      // signDisplay: 'always',
      maximumFractionDigits,
      minimumFractionDigits,
    }).format(value);
    return text;
  };
  
  export const getValuesWithCommas = (value:string) => {
    if (value === undefined) value = '';
    value = value ?? '';
  
    value = value?.toString()?.split(',')?.join('');
  
    let returnText = new Intl.NumberFormat().format(parseInt(value));
    return returnText;
  };

export function getFormattedDate(date:Date, forUI:boolean) {
  if(date){
    let arr = date?.toString()?.split('-');
  
    let year = '';
    let month = '';
    let currentdate = '';
  
    if (arr[0] !== undefined) {
      if (arr[0].length == 4) {
        // 0th index having year
        [year, month, currentdate] = arr;
      } else {
        // oth index having date
        [currentdate, month, year] = arr;
      }
    }
    currentdate= currentdate.substring(0,2)
    if (forUI) {
      return `${currentdate}-${month}-${year}`;
    }
    return `${year}-${month}-${currentdate}`;
  }
  }
  

export default {
    getDashValues,
    getFormattedDate,
    getValuesWithCommas,


};