package com.comp539.shorturl.dto;

import com.comp539.shorturl.model.DailyVisitCount;

import java.util.List;

public class AnalyticResponse {
    private List<DailyVisitCount> dailyVisitCounts;

    public AnalyticResponse(List<DailyVisitCount> dailyVisitCounts) {
        this.dailyVisitCounts = dailyVisitCounts;
    }

    public List<DailyVisitCount> getDailyVisitCounts() {
        return dailyVisitCounts;
    }

    public void setDailyVisitCounts(List<DailyVisitCount> dailyVisitCounts) {
        this.dailyVisitCounts = dailyVisitCounts;
    }
}
