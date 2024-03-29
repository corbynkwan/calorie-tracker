const axios = require('axios');
let crawler = {};

crawler.restaurants = async function(){
    try{
        let response1 = await axios.get('https://ubc.nutrislice.com/menu/api/menutypes?exclude-archived=true');
        let response2 = await axios.get('https://ubc.nutrislice.com/menu/api/schools/');
        let result = [];
        response2.data.map(x=>{
            result.push({
                name:x.name,
                id:x.id,
                menus:getMenuData(x.active_menu_types.map(e=>e.id),response1.data),
                geolocation:x.geolocation,
                address:x.address,
                logo:x.logo,
                startTime:x.mon_start,
                endTime:x.mon_end
            });
        });
        return result;
    }catch (e) {
        console.log(e);
    }

}

crawler.getAllItems = async function(restaurantsData){
    let res = [];
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = today.getMonth().toString().padStart(2,'0');
    const day = today.getDate().toString().padStart(2,'0');
    for(let restaurantIndex in restaurantsData){
        for(let menuID in restaurantsData[restaurantIndex].menus){
            let response = await axios.get('https://ubc.nutrislice.com/menu/api/weeks/school/'+restaurantsData[restaurantIndex].id+'/menu-type/'+menuID+'/'+ year + '/'+ month +'/' + day);
            let menuDataWithinWeek = response.data;
            let menuItemsData = menuDataWithinWeek.days.find(e=>e.date===year+'-'+month+'-'+day).menu_items;
            for(var itemIndex in menuItemsData){
                let item = menuItemsData[itemIndex]
                if(item && item.food){
                    res.push(
                        {
                            item_id:item.food.id,
                            name:item.food.name,
                            calories:item.food.rounded_nutrition_info.calories,
                            nutritionData:{
                                g_protein:item.food.rounded_nutrition_info.g_protein,
                                g_fat:item.food.rounded_nutrition_info.g_fat,
                                g_saturated_fat:item.food.rounded_nutrition_info.g_saturated_fat,
                                g_trans_fat:item.food.rounded_nutrition_info.g_trans_fat,
                                mg_cholesterol:item.food.rounded_nutrition_info.mg_cholesterol,
                                g_carbs:item.food.rounded_nutrition_info.g_carbs,
                                g_sugar:item.food.rounded_nutrition_info.g_sugar,
                                g_added_sugar:item.food.rounded_nutrition_info.g_added_sugar,
                                mg_sodium:item.food.rounded_nutrition_info.mg_sodium,
                                mg_potassium:item.food.rounded_nutrition_info.mg_potassium,
                                g_fiber:item.food.rounded_nutrition_info.g_fiber,
                                g_protein:item.food.rounded_nutrition_info.g_protein,
                                mg_iron:item.food.rounded_nutrition_info.mg_iron,
                                mg_calcium:item.food.rounded_nutrition_info.mg_calcium,
                                mg_vitamin_c:item.food.rounded_nutrition_info.mg_vitamin_c,
                                iu_vitamin_a:item.food.rounded_nutrition_info.iu_vitamin_a,
                                mg_vitamin_d:item.food.rounded_nutrition_info.mg_vitamin_d,
                            },
                            price:item.price,
                            thumbnail:item.food.image_url,
                            restaurantId:restaurantsData[restaurantIndex].id,
                            filters:item.food.icons.food_icons.map(e=>e.synced_name)
                        }
                    )
                }
            }
        }
    }

    return res;
}


function getMenuData(menuIDs,allMenuData) {
    let res = [];
    let menus = [];
    for(let i in menuIDs){
        menus.push(allMenuData.find(e=>e.id===menuIDs[i]));
    }

    menus.map(element=>{
        res[element.id]=[];
        for(let i in element.menus){
            if(element.menus[i].display_name){
                res[element.id].push({
                    id:element.menus[i].id,
                    name:element.menus[i].display_name
                })
            }
        }

    });
    return res;
}


module.exports = crawler;