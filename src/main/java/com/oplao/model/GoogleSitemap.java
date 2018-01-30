package com.oplao.model;

import com.oplao.service.SearchService;
import org.json.JSONObject;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.zip.GZIPOutputStream;

public class GoogleSitemap {
    private String publicUrl;
    private List<Url> urls = new ArrayList<Url>();

    public String getPublicUrl() { return publicUrl; }
    public void setPublicUrl(String publicUrl) { this.publicUrl = publicUrl; }

    public List<Url> getUrls() { return new ArrayList<Url>(urls); }
    public Url addUrl(Url url) { urls.add(url); return url; }
    public void removeUrl(Url url) { urls.remove(url); }

    private String w3cDateTime(Date date) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
        String formated = df.format(date);
        return formated.substring(0, 22) + ":" + formated.substring(22);
    }

    private static void compressGzipFile(String file, String gzipFile) {
        try {
            FileInputStream fis = new FileInputStream(file);
            FileOutputStream fos = new FileOutputStream(gzipFile);
            GZIPOutputStream gzipOS = new GZIPOutputStream(fos);
            byte[] buffer = new byte[1024];
            int len;
            while((len=fis.read(buffer)) != -1){
                gzipOS.write(buffer, 0, len);
            }
            //close resources
            gzipOS.close();
            fos.close();
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public void write() {
        List<JSONObject> countries = null;
        List<String> langCodes = java.util.Arrays.asList("en", "ru", "by", "ua", "fr", "it", "de");
        List<String> prefixes = java.util.Arrays.asList("weather", "weather/today", "weather/tomorrow",
                "weather/3", "weather/5", "weather7", "weather10", "weather/history1", "weather/history3", "weather/map",
                "weather/hour-by-hour-3", "weather/hour-by-hour-1");
        try {
            countries = SearchService.findByOccurences("https://bd.oplao.com/country/index.json");
        } catch (IOException e) {
            e.printStackTrace();
        }
        List<String> locations = new ArrayList<>();
        for (JSONObject country : countries) {
            Map countryInfo = null;
            try {
                countryInfo = SearchService.getCountryInfo(country.getString("name").replaceAll(" ", "%20"), "en");
            } catch (Exception e) {

            }
            if (countryInfo != null && countryInfo.get("largestCities") != null) {
                for (Object city : (ArrayList) countryInfo.get("largestCities")) {
                    locations.add(((String) ((HashMap) city).get("name")).replace(" ", "%20") + "_" + country.getString("iso"));
                }
            }
        }
        int a = 0;
        try {
            File file = new File(System.getProperty("user.dir") + "\\src\\main\\webapp\\sitemap\\sitemap-"+ a + ".xml");
            PrintWriter printWriter1 = new PrintWriter(file);
            for (int i = 0; i < locations.size(); i++) {
                if(i % 300 == 0){
                    String filePath = System.getProperty("user.dir") +"\\src\\main\\webapp\\sitemap\\sitemap-"+ a + ".xml";
                    String gzipFile = filePath + ".gz";
                    compressGzipFile(filePath, gzipFile);
                    a++;
                    file = new File(System.getProperty("user.dir") + "\\src\\main\\webapp\\sitemap\\sitemap-"+ a + ".xml");
                    printWriter1 = new PrintWriter(file);
                }
                printWriter1.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
                printWriter1.println("\"<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xhtml=\"http://www.w3.org/1999/xhtml\">\"");
                for (String langCode : langCodes) {
                    for (String prefix : prefixes) {
                            printWriter1.println("<url>");
                            printWriter1.println("<loc>https://oplao.com/" + langCode + "/" + prefix + "/" + locations.get(i) + "</loc>");
                            printWriter1.println("<changefreq>daily</changefreq>");

                            for (String langCode1 : langCodes) {
                                printWriter1.write("<xhtml:link rel = \"alternate\" hreflang=" + '"' + langCode1 + '"' + " href=\"https://oplao.com/" + langCode1 + "/" + prefix + "/" + locations.get(i) + " />");
                            }
                            printWriter1.println("</url>");
                        }
                }
            }
            printWriter1.flush();
            printWriter1.close ();
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            PrintWriter printWriter2 = new PrintWriter(new File(System.getProperty("user.dir") + "\\src\\main\\webapp\\sitemap\\sitemap.xml"));
            printWriter2.println("<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">");
            for(int i = 0; i < a; i++){
                printWriter2.println("<sitemap>");
                printWriter2.println("<loc>"+ "https://oplao.com/sitemap/sitemap-"+ i + ".xml.gz"+"</loc>");

                printWriter2.println("</sitemap>");

            }
            printWriter2.println("</sitemapindex>");

            printWriter2.flush();
            printWriter2.close ();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

    }

    public static class Url {
        private String loc;
        private float priority = 0.5f;
        private Changefreq changefreq = Changefreq.WEEKLY;
        private Date lastModified = null;

        public Url(String loc) {
            this.loc = loc;
        }

        public Url(String loc, Changefreq changefreq) {
            this.loc = loc;
            this.changefreq = changefreq;
        }

        public Url(String loc, Changefreq changefreq, float priority) {
            this.loc = loc;
            this.changefreq = changefreq;
            this.priority = priority;
        }

        public String getLoc() { return loc; }
        public void setLoc(String loc) { this.loc = loc; }

        public float getPriority() { return priority; }
        public void setPriority(float priority) { this.priority = priority; }

        public Changefreq getChangefreq() { return changefreq; }
        public void setChangefreq(Changefreq changefreq) { this.changefreq = changefreq; }

        public Date getLastModified() { return lastModified; }
        public void setLastModified(Date lastModified) { this.lastModified = lastModified; }
    }

    public static enum Changefreq {
        ALWAYS, HOURLY, DAILY, WEEKLY, MONTHLY, YEARLY, NEVER
    }

    public static void main(String[] args) throws IOException {

    }
}