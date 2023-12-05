package com.comp539.shorturl.gateway;

import com.comp539.shorturl.model.DailyVisitCount;
import com.google.api.gax.rpc.ServerStream;
import com.google.cloud.bigtable.data.v2.models.*;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class ViewCountTblGateway extends BigTableAbstarctGateway{
    private final String TABLE_NAME = "team3_visitCount";
    private final String FAMILY_NAME = "viewCount";
    private final String COLUMN_NAME = "viewCount";

    public void updateViewCount(String url, String timeStamp){
        ReadModifyWriteRow incrementMutation =
                ReadModifyWriteRow.create(TABLE_NAME, url+"&"+timeStamp)
                        .increment(FAMILY_NAME, COLUMN_NAME, 1);
        dataClient.readModifyWriteRow(incrementMutation);
    }

    public List<DailyVisitCount> getViewCount(String url, String startTimeStamp, String endTimeStamp){
        String start = url +"&" + startTimeStamp;
        String end = url + "&" + endTimeStamp;
        Query query = Query.create(TABLE_NAME).range(start, end);
        ServerStream<Row> rows = dataClient.readRows(query);
        List<DailyVisitCount> result = new ArrayList<>();
        for (Row row : rows) {
            String[] segments = row.getKey().toStringUtf8().split("&");
            String date = segments[segments.length - 1];
            byte[] bytes = row.getCells(FAMILY_NAME, COLUMN_NAME).get(0).getValue().toByteArray();
            int count = new BigInteger(bytes).intValue();
            result.add(new DailyVisitCount(date, count));
        }
        return result;
    }
}
