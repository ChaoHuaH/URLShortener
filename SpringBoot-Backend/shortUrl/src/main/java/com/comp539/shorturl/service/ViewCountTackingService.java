package com.comp539.shorturl.service;

import com.comp539.shorturl.gateway.ViewCountTblGateway;
import com.comp539.shorturl.model.DailyVisitCount;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.swing.text.View;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ViewCountTackingService {

    private DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
    private ViewCountTblGateway viewCountTblGateway;

    public ViewCountTackingService(ViewCountTblGateway viewCountTblGateway){
        this.viewCountTblGateway = viewCountTblGateway;
    }

    public void addViewCount(String url){
        String date = df.format(new Date());
        System.out.println("date is " + date);
        viewCountTblGateway.updateViewCount(url, date);
        System.out.println("called once");
    }

    public List<DailyVisitCount> getViewCounts(String url, String startDate, String endDate){
        String webpage = url.split("\\?")[0];
        return viewCountTblGateway.getViewCount(webpage,startDate, endDate);
    }
}
