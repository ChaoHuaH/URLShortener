package com.comp539.shorturl.gateway;

import com.google.cloud.bigtable.data.v2.BigtableDataClient;
import com.google.cloud.bigtable.data.v2.BigtableDataSettings;
import com.google.cloud.bigtable.data.v2.models.*;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static com.google.cloud.bigtable.data.v2.models.Filters.FILTERS;

public abstract class BigTableAbstarctGateway {

    private final static String PROJECT_ID = "rice-comp-539-spring-2022";
    private final static String INSTANCE_ID = "rice-shared";
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

    public boolean mutateWhenNotExist(String tableId, String rowKey, Mutation mutation){
        Filters.Filter filter = FILTERS.key().regex(rowKey);
        ConditionalRowMutation conditionalRowMutation = ConditionalRowMutation.create(tableId, rowKey).condition(filter).otherwise(mutation);
        boolean success = dataClient.checkAndMutateRow(conditionalRowMutation);
        return success;
    }

}
