package com.comp539.shorturl.gateway;

import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigtable.data.v2.BigtableDataClient;
import com.google.cloud.bigtable.data.v2.BigtableDataSettings;
import com.google.cloud.bigtable.data.v2.models.Row;
import com.google.cloud.bigtable.data.v2.models.RowCell;
import com.google.cloud.bigtable.data.v2.models.RowMutation;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class BigTableGateway {

    private final static String PROJECT_ID = "analog-pilot-401519";
    private final static String INSTANCE_ID = "shortenurl1";
    private static BigtableDataSettings settings;
    private static BigtableDataClient dataClient;

    static{
        settings = BigtableDataSettings.newBuilder().setProjectId(PROJECT_ID).setInstanceId(INSTANCE_ID).build();
        try {
            System.out.println("Connecting to DB......");
            dataClient = BigtableDataClient.create(settings);
        } catch (IOException e) {
            System.out.println("Fail to Connect to DB");
        }
    }

    public Row readRow(String tableId, String rowKey){
        Row row = dataClient.readRow(tableId, rowKey);
        return row;
    }

    public void writeRow(String tableId, String columnFamily, String qualifier, String rowKey, String value){
        RowMutation rowMutation = RowMutation.create(tableId, rowKey).setCell(columnFamily, qualifier, value);
        dataClient.mutateRow(rowMutation);
    }
}
