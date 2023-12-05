package com.comp539.shorturl.model;

public class DailyVisitCount {
    private String date;
    private long viewCount;

    public DailyVisitCount(String date, long viewCount) {
        this.date = date;
        this.viewCount = viewCount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public long getViewCount() {
        return viewCount;
    }

    public void setViewCount(long viewCount) {
        this.viewCount = viewCount;
    }
}
