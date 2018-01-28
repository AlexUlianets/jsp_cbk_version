package com.oplao.model;

public class DetailedForecastGraphMapping extends TempMapping{

    private String date;
    private double precipMM;
    private double precipInch;
    private String weatherIcon;

    public DetailedForecastGraphMapping(String tempC, String tempF, String date, double precipMM, double precipInch, String weatherIcon) {
        super(tempC, tempF);
        this.date = date;
        this.precipMM = precipMM;
        this.precipInch = precipInch;
        this.weatherIcon = weatherIcon;
    }


    public double getPrecipInch() {
        return precipInch;
    }

    public void setPrecipInch(double precipInch) {
        this.precipInch = precipInch;
    }

    public String getWeatherIcon() {
        return weatherIcon;
    }

    public void setWeatherIcon(String weatherIcon) {
        this.weatherIcon = weatherIcon;
    }

    public String getTempC(){
        return super.getTempC();
    }

    public String  getTempF(){
        return super.getTempF();
    }

    public void setTempC(String tempC){
        super.setTempC(tempC);
    }

    public void setTempF(String tempF){
         super.setTempF(tempF);
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getPrecipMM() {
        return precipMM;
    }

    public void setPrecipMM(double precipMM) {
        this.precipMM = precipMM;
    }
}
