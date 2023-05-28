const {countries} = require("../common/countries");
let card_background = [
    {
      color: "#E1B0D3",
      gradient:
        "linear-gradient(230.83deg, #FFF6ED 20.4%, rgba(255, 246, 237, 0) 82.29%)",
    },
    {
      color: "#C6B0E1",
      gradient:
        "linear-gradient(230.83deg, #E6D2FF 20.4%, rgba(230, 210, 255, 0) 82.29%)",
    },
    {
      color: "#B0DEE1",
      gradient:
        "linear-gradient(230.83deg, #DFFDFF 20.4%, rgba(223, 253, 255, 0) 82.29%)",
    },
    {
      color: "#A1EAC7",
      gradient:
        "linear-gradient(230.83deg, #D3FFEA 20.4%, rgba(211, 255, 234, 0) 77.77%)",
    },
    {
      color: "#FFEC8A",
      gradient:
        "inear-gradient(230.83deg, #FFF9D9 20.4%, rgba(255, 249, 217, 0) 82.29%)",
    },
    {
      color: "#FFD4AC",
      gradient:
        "linear-gradient(230.83deg, #FFF6ED 20.4%, rgba(255, 246, 237, 0) 82.29%)",
    },
  ];
  function getDollars(fullTimePrice) {
   
    if (fullTimePrice) {
      if (fullTimePrice < 2500) {
        return [
          { color: "#35B15A" },
          { color: "#A3AAB4" },
          { color: "#A3AAB4" },
        ];
      } else if (fullTimePrice >= 2500 && fullTimePrice <= 5000) {
        return [
          { color: "#35B15A" },
          { color: "#35B15A" },
          { color: "#A3AAB4" },
        ];
      } else {
        return [
          { color: "#35B15A" },
          { color: "#35B15A" },
          { color: "#35B15A" },
        ];
      }
    } else {
      return [];
    }
  }
  function findMaxHoursAndAmount(data) {
    let maxHours = -Infinity;
    let maxAmount = 0;
  
    for (let i = 0; i < data.length; i++) {
      const { hours, monthly_amount } = data[i];
  
      if (hours > maxHours) {
        maxHours = hours;
        maxAmount = monthly_amount;
      }
    }
  
    return { maxHours, maxAmount };
  }
  function formatName(name) {
    const firstThreeLetters = name.substring(0, 3);
    const asterisks = '***';
    return `${firstThreeLetters}${asterisks}`;
  }
 
 function bookkeeperService (){
   return{
      generateRequiredDataForBookkeperTemplate(data){
        let noOfVas = data.length ;
        let locals = {firstFoldVAData : [],secondFoldVAData:[]};
        // max 4 vas 
        for(let i=0;i<noOfVas;i++){
            let vaData = {};
            let profile_data = data[i];
            const {maxHours,maxAmount}=findMaxHoursAndAmount(profile_data.plan_set.plans);
            vaData.bg_image = profile_data.details?.display_pic_no_bg;
            vaData.country_flag_url =`https://flagcdn.com/h20/${countries[profile_data.country]}.png`;
            vaData.job_name = profile_data.details?.job_profile.toLowerCase();
            vaData.available_hours =  maxHours;
            vaData.card_background_color =  card_background[i % card_background.length].color;
            vaData.card_background_gradient = card_background[i % card_background.length].gradient;
            vaData.dollar_signs = getDollars(maxAmount);
            vaData.skills =profile_data.details?.skills || [] ;
            vaData.id = profile_data.id ;
            vaData.name = formatName(profile_data.name)

            if(i<2){
                locals.firstFoldVAData.push(vaData)
            }else{
                locals.secondFoldVAData.push(vaData)
            }

        

        }

        return locals ;


      }
   }
}

module.exports = bookkeeperService ;