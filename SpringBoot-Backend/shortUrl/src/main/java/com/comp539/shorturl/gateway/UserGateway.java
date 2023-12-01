package com.comp539.shorturl.gateway;

import com.google.cloud.bigtable.data.v2.models.Mutation;
import com.google.cloud.bigtable.data.v2.models.Row;
import com.google.cloud.bigtable.data.v2.models.RowCell;
import com.comp539.shorturl.model.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserGateway extends BigTableAbstarctGateway {
    private static final String USER_TABLE = "team3_Users";
    private static final String FAMILY_NAME = "userInfo";
    private static final String NAME_COLUMN = "name";
    private static final String PASSWORD_COLUMN = "password";

    public User getUser(String email) {
        Row userRow = readRow(USER_TABLE, email);

        // Extract the values for each column
        String name = getSingleCellValue(userRow, FAMILY_NAME, NAME_COLUMN);
        String password = getSingleCellValue(userRow, FAMILY_NAME, PASSWORD_COLUMN);

        // Construct and return a User object or similar
        return new User(email, password, name);
    }

    private String getSingleCellValue(Row row, String familyName, String columnName) {
        // Assuming each column only has a single cell
        List<RowCell> cells = row.getCells(familyName, columnName);
        if (cells != null && !cells.isEmpty()) {
            return cells.get(0).getValue().toStringUtf8();
        }
        return null;
    }

    public boolean insertUser(User user) {
        Mutation mutation = Mutation.create()
                .setCell(FAMILY_NAME, NAME_COLUMN, user.getName())
                .setCell(FAMILY_NAME, PASSWORD_COLUMN, user.getPassword());
        return mutateWhenNotExist(USER_TABLE, user.getEmail(), mutation);
    }
}
