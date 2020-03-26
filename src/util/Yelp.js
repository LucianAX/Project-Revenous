import SearchBar from "../components/SearchBar/SearchBar";
import apiKeys from "./apiKeys";   

    //object that stores the functionality needed to interact with the Yelp API
const Yelp = {
    searchYelp(term, location, sortBy) {
        return fetch(
            //request to the CORS Anywhere API for gaining proper CORS permissions needed for the request to the Yelp API to work
            `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, 
            {   //format for authorization specified by CORS Anywhere API
                headers: {
                    Authorization: `Bearer ${apiKeys.yelpKey}`
                }
            })
            .then(response => {
                return response.json(); //convert response object to JSON object
            })
            .then((jsonResponse) => {
                if (jsonResponse.businesses) {
                    return  jsonResponse.businesses.map(business => {
                            console.log(business);

                            return {
                              id:           business.id,
                              imageSrc:     business.image_url,
                              name:         business.name,
                              address:      business.location.address1,
                              city:         business.location.city,
                              state:        business.location.state,
                              zipCode:      business.location.zip_code,
                              category:     business.categories[0].title,
                              rating:       business.rating,
                              reviewCount:  business.review_count
                            };
                        });
                    }
            });
    }
};
    
export default Yelp;