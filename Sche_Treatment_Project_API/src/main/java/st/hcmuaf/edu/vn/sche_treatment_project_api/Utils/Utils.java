package st.hcmuaf.edu.vn.sche_treatment_project_api.Utils;

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

}
