package com.oplao.service;

import com.oplao.Application;
import com.oplao.Utils.AddressGetter;
import com.oplao.Utils.LanguageUtil;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class SearchService {
    public static final String cookieName = "lastCitiesVisited";
    public static final String langCookieCode = "langCookieCode";
    public static final String validCountryCodes[] = {"en", "ru", "it", "fr", "de", "by", "ua"};
    private static final List<String> cities = Arrays.asList(new String[]{"Hong Kong", " Singapore", " Bangkok", " London", " Macau", " Kuala Lumpur", " Shenzhen", " New York City", " Antalya", " Paris", " Istanbul", " Rome", " Dubai", " Guangzhou", " Phuket", " Mecca", " Pattaya", " Prague", " Shanghai", " Las Vegas", " Miami", " Barcelona", " Moscow", " Beijing", " Los Angeles", " Budapest", " Vienna", " Amsterdam", " Sofia", " Madrid", " Orlando", " Ho Chi Minh City", " Lima", " Berlin", " Tokyo", " Warsaw", " Chennai", " Cairo", " Nairobi", " Hangzhou", " Milan", " San Francisco", " Buenos Aires", " Venice", " Mexico City", " Dublin", " Seoul", " Mugla", " Mumbai", " Denpasar", " Delhi", " Toronto", " Zhuhai", " Saint Petersburg", " Burgas", " Sydney", " Djerba", " Munich", " Johannesburg", " Cancun", " Edirne", " Suzhou", " Bucharest", " Punta Cana", " Agra", " Jaipur", " Brussels", " Nice", " Chiang Mai", " Sharm el-Sheikh", " Lisbon", " Porto", " Marrakech", " Jakarta", " Manama", " Honolulu", " Vietnam", " Manila", " Guilin", " Auckland", " Siem Reap", " Sousse", " Amman", " Vancouver", " Abu Dhabi", " Kiev", " Doha", " Florence", " Rio de Janeiro", " Melbourne", " Washington D.C.", " Riyadh", " Christchurch", " Frankfurt", " Baku", " Sao Paulo", " Harare", " Kolkata", " Nanjing", " Athens", " Copenhagen", " Edinburgh", " Stockholm", " Oslo", " Oxford", " Cannes", " Helsinki", " Bruges", " Hamburg", " Pisa", " Dubrovnik", " Tallinn", " Granada", " Salzburg", " Bilbao", " Strasbourg", " Reykjavik", " Naples", " Monaco", " Riga", " Liverpool", " Luxembourg", " Cologne", " Krakow", " Malaga", " Verona", " Thessaloniki", " Zurich", " Seville", " Geneva", " Marseille", " Palma De Mallorca", " Valencia", " Glasgow", " Mykonos", " Dresden", " Palermo", " Bali", " Crete", " Roatan", " Kathmandu", " Cusco", " Corsica", " Lyon", " Bordeaux", " Beaune", " Sorrento", " Hurghada", " Alexandria", " St. Moritz", " Madeira", " Faro", " Utrecht", " Rotterdam", " Goa", " Varanasi", " Rishikesh", " Kyoto", " Osaka", " Port Douglas", " Darwin", " Brisbane", " Perth", " Lhasa", " Split", " Budva", " Cape Town", " Vilamendhoo", " Hilo", " Victoria", " Costa Del Sol", " Bergen", " Whitsundays", " Bathsheba", " Hoi An", " Versailles", " Grindelwald", " Cascais", " Sao Miguel", " Luxor", " Bremen", " Larnaca", " Tel Aviv", " New Orleans", " Unawatuna", " Mirissa", "Tenerife"});

    public List<HashMap> findSearchOccurences(String searchRequest, String langCode){
        List list = null;
        if((Character.isDigit(searchRequest.trim().charAt(0)) || Character.isDigit(searchRequest.trim().charAt(1))) && searchRequest.contains(",")){
            String [] parsedRequest = searchRequest.split(",");
            String lat = "";
            String lon = "";
            if(parsedRequest.length==4){
                lat= parsedRequest[0].trim() + "." + parsedRequest[1].replaceAll("°", "").trim();
                lon = parsedRequest[2].trim() +"." +parsedRequest[3].replaceAll("°", "").trim();
            }else {
                lat = parsedRequest[0].replace(",", ".").replaceAll("°", "").trim();
                try {
                    lon = parsedRequest[1].replaceAll(",", ".").replaceAll("°", "").trim();
                }catch (ArrayIndexOutOfBoundsException ignored){
                }
            }

            if(lat.contains(".")&& lon.contains(".")) {
                list = findByCoordinates(lat, lon, langCode);
            }else {
                return null;
            }
        }else if(searchRequest.length()==3 && Objects.equals(searchRequest, searchRequest.toUpperCase())) {
            list = findByAirports(searchRequest, langCode);
        }
        else {
                 list = findByCity(searchRequest, langCode);
        }
            List<HashMap> maps = new ArrayList<>();
            for (int i = 0; i < list.size(); i++) {
                maps.add((HashMap) ((JSONObject) list.get(i)).toMap());
            }
            return maps;
    }


    public HashMap selectCity(int geonameId, String currentCookieValue, HttpServletRequest request, HttpServletResponse response, String langCode){
        List<JSONObject> list = null;
        JSONObject city = null;
        try{
            try {
                list = findByGeonameId(geonameId, langCode);
                city = list.get(0);
            }catch (Exception e){
                list = findByGeonameIdAirports(geonameId, langCode);
                city = list.get(0);
            }

            city.put("status", "selected");
            JSONArray arr = null;
            if(currentCookieValue.equals("")){
                arr = new JSONArray("["+currentCookieValue+"]");
            }else{
                 arr = new JSONArray(currentCookieValue);
            }
            for (int i = 0; i < arr.length(); i++) {
                arr.getJSONObject(i).put("status", "unselected");
            }

            if(checkDuplicateCookie(request, response,city) != 0) {
                if(arr.length()>4){
                    arr.remove(4);
                    arr.put(4, city);
                }else{
                    arr.put(city);
                }
                clearCookies(request, response);

                Cookie c = new Cookie(cookieName, URLEncoder.encode(arr.toString(), "UTF8"));
                c.setPath("/");
                c.setMaxAge(60 * 60 * 24 * 365 * 10);
                response.addCookie(c);

                return (HashMap)city.toMap();
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        return (HashMap)city.toMap();
    }


    private int checkDuplicateCookie(HttpServletRequest request, HttpServletResponse response,
                                     JSONObject city){
        if(request.getCookies()!=null) {
            for (int i = 0; i < request.getCookies().length; i++) {
                if (request.getCookies()[i].getName().equals(SearchService.cookieName)) {
                    JSONArray array = null;
                    try {
                        if(!request.getCookies()[i].getValue().equals("")) {
                            array = new JSONArray(URLDecoder.decode(request.getCookies()[i].getValue(), "UTF-8"));
                        }else{
                            array = new JSONArray();
                        }
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }
                    for (int j = 0; j < array.length(); j++) {
                        if (Objects.equals("" + (array.getJSONObject(j)).get("geonameId"),
                                "" + city.get("geonameId"))) {
                            setCitySelected(array, j);
                            clearCookies(request, response);

                            Cookie c = null;
                            try {
                                 c = new Cookie(cookieName, URLEncoder.encode(array.toString(), "UTF8"));
                            } catch (UnsupportedEncodingException e) {
                                e.printStackTrace();
                            }
                            c.setPath("/");
                            c.setMaxAge(60 * 60 * 24 * 365 * 10);
                            response.addCookie(c);

                            return 0;
                        }
                    }
                }
            }
        }
        return 1;
    }

    private void setCitySelected(JSONArray array, int index){

        for (int i = 0; i < array.length(); i++) {
            array.getJSONObject(i).put("status", "unselected");
        }

        array.getJSONObject(index).put("status", "selected");
    }

    public static List<JSONObject> findByOccurences(String url) throws IOException, JSONException {
        InputStream is = null;
        try {
            is = new URL(url).openStream();

            BufferedReader rd = new BufferedReader(new InputStreamReader(is, "UTF8"));
            String myString = rd.readLine();
//            String jsonText = WeatherService.readAll(rd);
            List<JSONObject> objects = new ArrayList<>();

            JSONArray jsonArray = new JSONArray(myString);
            for (int i = 0; i < jsonArray.length(); i++) {
                objects.add((JSONObject)jsonArray.get(i));
            }
            return objects;
        }catch(NullPointerException e) {
            e.printStackTrace();
        }finally
        {
            if(is!=null) {
                is.close();
            }
        }
        System.out.println("Suchara");
        return null;
    }

    private List<JSONObject> findByCoordinates(String lat, String lon, String langCode){
        List<JSONObject> list = null;
        try {
            list = SearchService.findByOccurences("https://bd.oplao.com/geoLocation/find.json?lang="+LanguageUtil.validateOldCountryCodes(langCode)+"&max=10&lat=" + lat + "&lng=" + lon);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return list;
    }

    private List<JSONObject> findByGeonameIdAirports(int geonameId, String langCode){
        List<JSONObject> list = null;
        try {
            list = SearchService.findByOccurences("https://bd.oplao.com/geoLocation/find.json?lang="+LanguageUtil.validateOldCountryCodes(langCode)+"&max=10&geonameId=" + geonameId + "&featureClass=S");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return list;
    }

    private List<JSONObject> findByGeonameId(int geonameId, String langCode){
        List<JSONObject> list = null;
        try {
            String url = "https://bd.oplao.com/geoLocation/find.json?lang="+LanguageUtil.validateOldCountryCodes(langCode)+"&max=10&geonameId=" + geonameId;
            list = SearchService.findByOccurences(url);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return list;
    }
    private List<JSONObject> findByAirports(String name, String langCode){
        List<JSONObject> list = null;
        try {
            list = SearchService.findByOccurences("https://bd.oplao.com/geoLocation/find.json?lang="+LanguageUtil.validateOldCountryCodes(langCode)+"&max=10&nameStarts="+name.trim()+"&featureClass=S");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return list;
    }


    private List<JSONObject> findByCity(String city, String langCode){
        List<JSONObject> list = null;
        try {
            String url ="https://bd.oplao.com/geoLocation/find.json?lang="+LanguageUtil.validateOldCountryCodes(langCode)+"&max=10&nameStarts=" + URLEncoder.encode(city.replaceAll(" ", "%20"), "UTF-8");
            list = SearchService.findByOccurences(url.replaceAll("25", ""));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return list;
    }
   private void clearCookies(HttpServletRequest request, HttpServletResponse response){
        if(request.getCookies()!=null){
       for (int i = 0; i < request.getCookies().length; i++) {
           if (request.getCookies()[i].getName().equals(cookieName)) {
               request.getCookies()[i].setPath("/");
               request.getCookies()[i].setValue("");
               request.getCookies()[i].setMaxAge(0);
               response.addCookie(request.getCookies()[i]);
           }
       }
       }
   }


   public JSONObject findSelectedCity(HttpServletRequest request, HttpServletResponse response, String currentCookieValue) {

       if (!Objects.equals(currentCookieValue, "")) {
           JSONArray array = new JSONArray(currentCookieValue);
           for (int i = 0; i < array.length(); i++) {
               if (array.getJSONObject(i).get("status").equals("selected")) {
                   return array.getJSONObject(i);
               }
           }
       } else {
           return findGeolocation(request,response);
//           GeoLocation geoLocation = GeoIPv4.getLocation(AddressGetter.getCurrentIpAddress(request));
//
//           List<JSONObject> list = null;
//           try {
//               list = SearchService.findByOccurences("https://bd.oplao.com/geoLocation/find.json?lang=en&max=10&nameStarts=" + geoLocation.getCity());
//               JSONObject obj = list.get(0);
//               obj.put("status", "selected");
//               JSONArray arr = new JSONArray("["+obj.toString()+"]");
//               Cookie c = new Cookie(cookieName,arr.toString());
//               c.setMaxAge(60 * 60 * 24);
//               c.setPath("/");
//               response.addCookie(c);
//               return obj;
//           } catch (IOException e) {
//               e.printStackTrace();
//           }get_
       }
       return null;
   }

    private JSONObject findGeolocation(HttpServletRequest request, HttpServletResponse response){
           JSONObject location = null;
           Application.log.info("generating location...");

           String currentIp = AddressGetter.getCurrentIpAddress(request);
           try {
               location = WeatherService.readJsonFromUrl("http://freegeoip.net/json/" + currentIp);
               System.out.println(location.getString("country_code"));
           } catch (IOException e) {
                Application.log.info("cannot find location for ip " + currentIp);
           }catch (JSONException ex) {
               currentIp = "212.98.171.68";
               try {
                   location = WeatherService.readJsonFromUrl("http://freegeoip.net/json/" + currentIp);
               } catch (IOException e) {
                   e.printStackTrace();
               }
           }
               if(location.getString("country_code").equals("") && location.getString("city").equals("")){
                   currentIp = "212.98.171.68";
                   try {
                       location = WeatherService.readJsonFromUrl("http://freegeoip.net/json/" + currentIp);
                   } catch (IOException e) {
                       e.printStackTrace();
                   }
               }



           Application.log.info("generated.");
           List<JSONObject> list = null;
           String langCode = "en";
           if(Arrays.asList(validCountryCodes).contains(System.getProperty("user.language").toLowerCase())){
               langCode = System.getProperty("user.language").toLowerCase();
           }

           try {
               String url = "https://bd.oplao.com/geoLocation/find.json?lang="+LanguageUtil.validateOldCountryCodes(langCode)+"&max=10&nameStarts=" + URLEncoder.encode(location.getString("city"), "UTF-8");
               list = SearchService.findByOccurences(url);

               JSONObject obj = list.get(0);
               obj.put("status", "selected");
               JSONArray arr = new JSONArray("["+obj.toString()+"]");
               Application.log.info(arr.toString());

               Cookie c = new Cookie(cookieName, URLEncoder.encode(arr.toString(), "UTF8"));

               Application.log.info(c.toString());

               c.setPath("/");
               c.setMaxAge(60 * 60 * 24 * 365 * 10);
               response.addCookie(c);

               boolean isLangPresent = false;
               boolean containsCookies = request.getCookies()==null;

               if(!containsCookies) {
                   for (int i = 0; i < request.getCookies().length; i++) {
                       if (request.getCookies()[i].getName().equals("langCookieCode")) {
                           isLangPresent = true;
                       }
                   }
               }
               if(!isLangPresent){
                   Cookie langCookie = new Cookie("langCookieCode", langCode);
                   langCookie.setPath("/");
                   langCookie.setMaxAge(60 * 60 * 24 * 365 * 10);
                   response.addCookie(langCookie);
               }
               return obj;
           } catch (IOException e) {
               e.printStackTrace();
           }
        return null;
       }


    public List<HashMap> createRecentCitiesTabs(String currentCookieValue, String langCode) {

        try {
            currentCookieValue = URLDecoder.decode(currentCookieValue, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        if (!currentCookieValue.equals("")) {
            JSONArray array = new JSONArray(currentCookieValue);

            ArrayList<HashMap> data = new ArrayList<>();
            for (int i = 0; i < array.length(); i++) {
                data.add(getRecentCityInfo(array.getJSONObject(i)));
            }
            return data;
        }
        return null;
    }

    private HashMap getRecentCityInfo(JSONObject city){

        String cityName = city.getString("name");
        if(cityName.contains("'")){
            cityName = cityName.replace("'", "");
        }
        cityName = cityName.replace(" ", "%20");
        DateTime dateTime = new DateTime(DateTimeZone.forID((String)((JSONObject)city.get("timezone")).get("timeZoneId")));
        JSONObject jsonObject = null;
        try {
            jsonObject = WeatherService.readJsonFromUrl("http://api.worldweatheronline.com/premium/v1/weather.ashx?key=kxz3zwcq55a7rkb48tqxjh9e&format=json&show_comments=no&mca=no&cc=yes&tp=1&date=" + dateTime.getYear() + "-" + dateTime.getMonthOfYear() + "-" + dateTime.getDayOfMonth() + "&q=" + String.valueOf(city.get("lat") + "," + String.valueOf(city.get("lng"))));
        } catch (IOException e) {
            e.printStackTrace();
        }
        HashMap map = (HashMap)jsonObject.toMap().get("data");
        HashMap currentCondition = ((HashMap)((ArrayList)map.get("current_condition")).get(0));
        HashMap<String, Object> result = new HashMap<>();

        int tempC = Integer.parseInt("" + currentCondition.get("temp_C"));
        int tempF = Integer.parseInt("" + currentCondition.get("temp_F"));
        result.put("weatherCode",(WeatherService.EXT_STATES.get(Integer.parseInt((String)currentCondition.get("weatherCode")))));
        result.put("tempC", tempC>0?"+"+tempC:tempC);
        result.put("tempF", currentCondition.get("temp_F"));
        result.put("city", cityName.replace("%20", " "));
        result.put("countryCode", city.getString("countryCode"));
        result.put("countryName", city.getString("countryName"));
        result.put("geonameId", city.getInt("geonameId"));
        result.put("hours", dateTime.getHourOfDay());
        return result;
    }

    public Cookie deleteCity(String currentCookieValue, String geonameId, HttpServletRequest request, HttpServletResponse response){
        JSONArray array = new JSONArray(currentCookieValue);
        for (int i = 0; i < array.length(); i++) {
            if(String.valueOf(array.getJSONObject(i).get("geonameId")).equals(geonameId)){
                array.remove(i);
                clearCookies(request, response);
                Cookie c = null;
                try {
                     c = new Cookie(cookieName, URLEncoder.encode(array.toString(), "UTF8"));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                c.setPath("/");
                c.setMaxAge(60 * 60 * 24 * 365 * 10);
                return c;
            }
        }
        return null;
    }

    public List<String> getTopHolidaysDestinations(int numOfCities, String languageCode){

            return validateTopHolidaysDestinations(cities, numOfCities, languageCode);
        }

    private List<String> validateTopHolidaysDestinations(List<String> destinations, int numOfCities, String langCookieCode){

        List<String> cities = new ArrayList<>();
        for (int i = 0; i < destinations.size(); i++) {
            cities.add(destinations.get(i).trim());
        }
        Random random = new Random();
        List<String> result = new ArrayList<>();
        for (int i = 0; i < numOfCities; i++) {
            int index = random.nextInt(cities.size());
            result.add(findByCity(cities.get(index), langCookieCode).get(0).getString("name"));
            cities.remove(index);
        }

        return result;
    }

    public List<HashMap> getCountryWeather(JSONObject city, String langCode) {

        JSONArray jsonArray = null;
        String url = "https://bd.oplao.com/geoLocation/find.json?lang="+LanguageUtil.validateOldCountryCodes(langCode)+"&max=10&countryCode=" + String.valueOf(city.get("countryCode")) + "&featureCode=PPLA";
        try {
            jsonArray = WeatherService.readJsonArrayFromUrl(url);
        } catch (IOException e) {
            e.printStackTrace();
        }

        DateTime dateTime = new DateTime(DateTimeZone.forID((String) ((JSONObject) city.get("timezone")).get("timeZoneId")));

        return jsonArray.length() >= 6 ? validateCountryWeather(jsonArray, dateTime, city, 6) : validateCountryWeather(jsonArray, dateTime, city, jsonArray.length());

    }

    private List<HashMap> validateCountryWeather(JSONArray jsonArray, DateTime dateTime, JSONObject city, int numOfCities) {

        List<HashMap> result = new ArrayList<>();
        for (int i = 0; i < numOfCities; i++) {
            HashMap map = (HashMap) jsonArray.getJSONObject(i).toMap();
            APIWeatherFinder apiWeatherFinder = new APIWeatherFinder(dateTime, "",
                    false, true, 6, String.valueOf(map.get("lat")), String.valueOf(map.get("lng")));
            HashMap weather = apiWeatherFinder.findWeatherByDate();
            HashMap currentConditions = ((HashMap) ((ArrayList) weather.get("current_condition")).get(0));
            int tempC = Integer.parseInt("" + currentConditions.get("temp_C"));
            int tempF = Integer.parseInt("" + currentConditions.get("temp_F"));
            map.put("temp_C", tempC > 0? "+"+tempC:tempC);
            map.put("temp_F", tempF);
            map.put("weatherCode", WeatherService.EXT_STATES.get(Integer.parseInt("" + (currentConditions.get("weatherCode")))));
            map.put("isDay", dateTime.getHourOfDay()>6 && dateTime.getHourOfDay()<18);
            result.add(map);
        }
        return result;
    }

    public List<HashMap> getHolidaysWeather(JSONObject city, String langCode) {
        List<String> cities = getTopHolidaysDestinations(6, langCode);

        List<HashMap> result = new ArrayList<>();
        for (int i = 0; i < cities.size(); i++) {
            HashMap hm = new HashMap();
            DateTime dateTime = new DateTime(DateTimeZone.forID((String) ((JSONObject) city.get("timezone")).get("timeZoneId")));
            try {
                hm = findSearchOccurences(cities.get(i), langCode).get(0);
            }catch (IndexOutOfBoundsException ignored){
            }
            APIWeatherFinder apiWeatherFinder = new APIWeatherFinder(dateTime, "",
                    false, true, 6, String.valueOf(hm.get("lat")), String.valueOf(hm.get("lng")));
            HashMap weather = apiWeatherFinder.findWeatherByDate();
            HashMap currentConditions = ((HashMap) ((ArrayList) weather.get("current_condition")).get(0));
            int tempC = Integer.parseInt("" + currentConditions.get("temp_C"));
            int tempF = Integer.parseInt("" + currentConditions.get("temp_F"));
            hm.put("temp_C", tempC>0?"+"+tempC:tempC);
            hm.put("temp_F", weather.get("temp_F"));
            hm.put("weatherCode", WeatherService.EXT_STATES.get(Integer.parseInt("" + (currentConditions.get("weatherCode")))));
            hm.put("isDay", dateTime.getHourOfDay()>6 && dateTime.getHourOfDay()<18);
            result.add(hm);
        }



        return result;

    }

    public JSONObject generateUrlRequestWeather(String location, String currentCookieValue, HttpServletRequest request, HttpServletResponse response, String langCode) {

        if (!location.equals("undefined")) {
            boolean airport = false;
            if (location.contains("airport") || location.contains("Airport")) {
                airport = true;
            }
            String city = location.substring(0, location.indexOf('_'));
            String countryCode = location.substring(location.indexOf('_') + 1, location.length());

            JSONArray jsonArray = null;
            try {
                String url = "https://bd.oplao.com/geoLocation/find.json?lang=" + LanguageUtil.validateOldCountryCodes(langCode) + "&max=10&nameStarts=" + URLEncoder.encode(city.replaceAll("'",""), "UTF-8").concat(airport ? "&featureClass=S" : "&countryCode=" + countryCode);
                jsonArray = WeatherService.readJsonArrayFromUrl(url);
            } catch (IOException e) {
                e.printStackTrace();
            }
            JSONObject obj = null;
            if (jsonArray != null) {
                if (!jsonArray.toString().equals("[]")) {
                    List<JSONObject> results = new ArrayList<>();
                    for (int i = 0; i < jsonArray.length(); i++) {
                        results.add(jsonArray.getJSONObject(i));
                    }
                    if (!jsonArray.getJSONObject(0).getString("countryCode").equals(countryCode)) {
                        obj = results.stream().filter(jsonObject -> jsonObject.getString("countryCode").equals(countryCode)).findFirst().get();
                    } else {
                        obj = jsonArray.getJSONObject(0);
                    }
                } else {
                    obj = findByCity(city.substring(0, city.length() - 1), langCode).get(0);
                }
            }
            JSONArray refreshedArray = null;
            if (currentCookieValue.equals("")) {
                refreshedArray = new JSONArray("[" + currentCookieValue + "]");
            } else {
                refreshedArray = new JSONArray(currentCookieValue);
            }
            for (int i = 0; i < refreshedArray.length(); i++) {
                refreshedArray.getJSONObject(i).put("status", "unselected");
            }
            obj.put("status", "unselected");
            boolean contains = false;
            int index = 0;
            for (int i = 0; i < refreshedArray.length(); i++) {
                if (refreshedArray.getJSONObject(i).getInt("geonameId") == obj.getInt("geonameId")) {
                    contains = true;
                    index = i;
                }
            }
            if (contains) {
                refreshedArray.getJSONObject(index).put("status", "selected");
            } else {
                obj.put("status", "selected");
                if(refreshedArray.length()<4) {
                    refreshedArray.put(obj);
                }else{
                    refreshedArray.put(4, obj);
                }
            }


            refreshLangCookie(request, response, langCode, refreshedArray.toString());
            return obj;
        }

        return null;
    }

    public String getSelectedCity(String currentCookieValue){
        JSONArray array = new JSONArray(currentCookieValue);
        if(currentCookieValue!="") {
            for (int i = 0; i < array.length(); i++) {
                if (array.getJSONObject(i).getString("status").equals("selected")) {

                    return array.getJSONObject(i).getString("asciiName")+ "_" + array.getJSONObject(i).getString("countryCode");
                }
            }
        }
        return null;
    }

public List<List> getCountries(String langCode){

        if(langCode.equals("")){
            langCode = "en";
        }
        langCode = LanguageUtil.validateOldCountryCodes(langCode);
        List<JSONObject> data = null;
    try {
        data = findByOccurences("https://bd.oplao.com/country/index.json");
    } catch (IOException e) {
        e.printStackTrace();
    }

    List<Map<String, String>> res = new ArrayList<Map<String, String>>();

    for (int i = 0; i < data.size(); i++){
        HashMap currentMap = (HashMap) data.get(i).toMap();
        for (int j = 0; j < ((ArrayList)currentMap.get("alternateNames")).size(); j++){
            HashMap elem =  ((HashMap)((ArrayList) currentMap.get("alternateNames")).get(j));
                if (elem.get("isoLanguage").equals(langCode) && !((String)currentMap.get("name")).toLowerCase().equals("antarctica")) {
                    HashMap map2 = new HashMap();
                    map2.put("name", elem.get("alternateName"));
                    map2.put("asciiName", ((String)currentMap.get("name")).toLowerCase().replace(" ", "_"));
                    res.add(map2);
                    break;
                }
                continue;
        }
    }


    Collections.sort(res, new Comparator<Map<String, String>>() {
        public int compare(final Map<String, String> o1, final Map<String, String> o2) {
            return o1.get("name").compareTo(o2.get("name"));
        }
    });

    List<List> result = new ArrayList<>();
    List<HashMap> workList = new ArrayList<>();
    char firstLet = ' ';
    for(Map<String, String> map: res){
        HashMap country = (HashMap)map;
        firstLet = ((String)country.get("name")).charAt(0);
        if(res.get(0).equals(country)){
            workList.add(country);
        }else {
            char sep;
            try {
               sep  = workList.get(workList.size() - 1).get("name").toString().charAt(0);
            }catch (IndexOutOfBoundsException ex){
                sep = country.get("name").toString().charAt(0);
            }
            if(firstLet == sep){
                workList.add(country);
            }else {
                result.add(workList);
                workList = new ArrayList<>();
                workList.add(country);
            }

            if(res.indexOf(map) == res.size()-1){
                result.add(workList);
            }
        }

    }
        return result;
}

public static Map getCountryInfo(String countryName, String langCode){
    countryName = countryName.substring(0,1).toUpperCase()+countryName.substring(1, countryName.length());
    Map data = null;

    try {
        data = WeatherService.readJsonFromUrl("https://bd.oplao.com/country/find.json?name="+countryName+"&lang=" + langCode).toMap();
    } catch (IOException e) {
        e.printStackTrace();
    }

    return data;
}

    public String selectLanguage(String reqUrl, HttpServletRequest request, HttpServletResponse response, String languageCookieCode, JSONObject currentCity, String currentCookieValue){
        List parsedUrl = Arrays.asList(reqUrl.split("/"));
        try {
            currentCookieValue = URLDecoder.decode(currentCookieValue, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        if(parsedUrl.contains("weather")||parsedUrl.contains("forecast")||parsedUrl.contains("about")||parsedUrl.contains("widgets")) {
            String requestedLang = reqUrl.split("/")[1];
            if (Arrays.asList(validCountryCodes).contains(requestedLang)) {
                if (!languageCookieCode.equals(requestedLang) && requestedLang.length() == 2) {
                    refreshLangCookie(request, response, requestedLang, currentCookieValue);
                    return requestedLang;
                }
            } else {
                response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
                response.setHeader("Location", reqUrl.replace(requestedLang, languageCookieCode));
            }
        }
        else if(parsedUrl.size()==0){
            if(languageCookieCode.equals("")) {
                if (Arrays.asList(SearchService.validCountryCodes).contains(currentCity.getString("countryCode").toLowerCase()) && !currentCity.getString("countryCode").equals(languageCookieCode)) {
                    refreshLangCookie(request, response, currentCity.getString("countryCode").toLowerCase(), currentCookieValue);
                    return currentCity.getString("countryCode").toLowerCase();
                } else {
                    refreshLangCookie(request, response, "en", currentCookieValue);
                    return "en";
                }
            }
        }

        return languageCookieCode.equals("")?currentCity.getString("countryCode"):languageCookieCode;
    }

    private void refreshLangCookie(HttpServletRequest request, HttpServletResponse response, String newValue, String currentCookieValue){

        if(request.getCookies()!=null) {
            for (int i = 0; i < request.getCookies().length; i++) {
                if (request.getCookies()[i].getName().equals(SearchService.langCookieCode)) {
                    request.getCookies()[i].setPath("/");
                    request.getCookies()[i].setValue("");
                    request.getCookies()[i].setMaxAge(0);
                    response.addCookie(request.getCookies()[i]);
                }
            }
        }
        Cookie c = null;
        try {
            c = new Cookie(langCookieCode, URLEncoder.encode(new String(newValue.getBytes(), "UTF-8"), "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        c.setPath("/");
        c.setMaxAge(60 * 60 * 24 * 365 * 10);
        response.addCookie(c);

        JSONArray array = null;
        if(currentCookieValue.equals("")){
            array = new JSONArray("["+currentCookieValue+"]");
        }else{
            array = new JSONArray(currentCookieValue);
        }
        if(!currentCookieValue.equals("")) {


            JSONArray resArray = new JSONArray();
            List<String> statuses = new ArrayList<>();
            for (int i = 0; i < array.length(); i++) {
                statuses.add(array.getJSONObject(i).getString("status"));
            }
            for (int i = 0; i < array.length(); i++) {
                resArray.put(findByGeonameId(array.getJSONObject(i).getInt("geonameId"), newValue).get(0));
                resArray.getJSONObject(i).put("status", statuses.get(i));
            }

            clearCookies(request, response);

            Cookie cookie = null;
            try {
                 cookie  = new Cookie(cookieName, URLEncoder.encode(resArray.toString(), "UTF8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            cookie.setPath("/");
            response.addCookie(cookie);
        }
    }
}
