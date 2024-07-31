package st.hcmuaf.edu.vn.sche_treatment_project_api.Utils;

import java.util.ArrayList;
import java.util.List;

public class Utils {
    public static String generateId() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
        int length = 8;
        StringBuilder ticketCode = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = (int) (Math.random() * characters.length());
            char randomChar = characters.charAt(randomIndex);
            ticketCode.append(randomChar);
        }
        return ticketCode.toString();
    }
    public static List<Double> initializeMonthlySumList() {
        List<Double> listResult = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            listResult.add(0.0);
        }
        return listResult;
    }

}
