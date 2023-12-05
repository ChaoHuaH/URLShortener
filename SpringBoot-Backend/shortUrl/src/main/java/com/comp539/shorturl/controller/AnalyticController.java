package com.comp539.shorturl.controller;

import com.comp539.shorturl.dto.AnalyticResponse;
import com.comp539.shorturl.dto.ToShortURLResponse;
import com.comp539.shorturl.model.DailyVisitCount;
import com.comp539.shorturl.service.ViewCountTackingService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AnalyticController {

    private ViewCountTackingService viewCountTackingService;

    public AnalyticController(ViewCountTackingService viewCountTackingService){
        this.viewCountTackingService = viewCountTackingService;
    }

    @GetMapping("analytic")
    @ResponseBody
    public ResponseEntity<AnalyticResponse> getAnalyticViewCount(String url, String start, String end){
        List<DailyVisitCount> dailyVisitCounts = viewCountTackingService.getViewCounts(url, start, end);
        AnalyticResponse analyticResponse = new AnalyticResponse(dailyVisitCounts);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "http://localhost:3000");
        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(analyticResponse);
    }

}
