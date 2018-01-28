package com.oplao.model;

public class TempMapping {

    private String tempC;
    private String tempF;


    public TempMapping(){

    }
    public TempMapping(String tempC, String tempF) {
        this.tempC = tempC;
        this.tempF = tempF;
    }

    public String getTempC() {
        return tempC;
    }

    public void setTempC(String tempC) {
        this.tempC = tempC;
    }

    public String getTempF() {
        return tempF;
    }

    public void setTempF(String tempF) {
        this.tempF = tempF;
    }
}
